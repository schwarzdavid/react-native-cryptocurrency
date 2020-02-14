import React from "react";
import {TextInput, View} from "react-native";
import {NavigationScreenProp} from "react-navigation";
import CurrencySwitch from "../../partials/CurrencySwitch";
import {RootState} from "../../reducers/reducer";
import {connect, ConnectedProps} from "react-redux";

const mapState = (state: RootState) => ({
    baseCurrency: state.settings.baseCurrency,
    prices: state.currency.prices
});

const connector = connect(mapState);

interface IConverterPageScreenProps {
    from?: string,
    to?: string
}

interface IConverterPageProps extends ConnectedProps<typeof connector> {
    navigation: NavigationScreenProp<{}, IConverterPageScreenProps>
}

interface IConverterPageState {
    from: string,
    to: string,
    input: string
}

type CurrencyAccessor = {
    (): string;
    (value: string): void;
};

class ConverterPage extends React.Component<IConverterPageProps, IConverterPageState> {
    private _toSymbol: CurrencyAccessor = (value?: string): any => {
        if (value) {
            return this.setState({
                to: value
            });
        }
        return this.state?.to ?? this.props.navigation.getParam('to') ?? this.props.baseCurrency;
    };

    private _fromSymbol: CurrencyAccessor = (value?: string): any => {
        if (value) {
            return this.setState({
                from: value
            });
        }
        return this.state?.from ?? this.props.navigation.getParam('from') ?? this.props.baseCurrency;
    };

    state = {
        from: this._fromSymbol(),
        to: this._toSymbol(),
        input: ''
    };

    private get _price(): number {
        let priceSymbol = this.state.from + '/' + this.state.to;
        if (this.props.prices.hasOwnProperty(priceSymbol)) {
            return this.props.prices[priceSymbol].value;
        } else {
            priceSymbol = this.state.from + '/' + this.state.to;
            if (this.props.prices.hasOwnProperty(priceSymbol)) {
                return this.props.prices[priceSymbol].value;
            }
        }
        return 1;
    }

    private get _result(): string {
        if (this.state.input === '') {
            return this.state.input;
        }
        const unformattedInput = this.state.input.replace(/\s/g, '');
        const result = parseFloat(unformattedInput) / this._price;
        return this._formatNumber(result.toString());
    }

    private get _input(): string {
        if (this.state.input === '') {
            return this.state.input;
        }
        return this.state.input;
    }

    private _onInputChange = (text: string): void => {
        if (text.endsWith(',')) {
            text = text.slice(0, -1) + '.';
        }
        if (text.endsWith('.')) {
            if ((text.match(/\./g) || []).length > 1) {
                text = text.slice(0, -1);
            }
        }
        if (text !== this.state.input) {
            text = this._formatNumber(text);
            this.setState({
                input: text
            });
        }
    };

    private _formatNumber = (text: string): string => {
        text = text.replace(/\s/g, '');
        let output = '';
        const [int, comma] = text.split('.');
        for (let str = int, gap = 3; str.length > 0; str = str.substring(0, str.length - gap)) {
            output = str.substr(-gap) + ' ' + output;
        }
        output = output.trim();
        if (comma) {
            output += '.' + comma.substr(0, 4);
        } else if (text.endsWith('.')) {
            output += '.';
        }
        return output;
    };

    render() {
        return (
            <View>
                <View>
                    <CurrencySwitch value={this.state.from} onChange={this._fromSymbol}/>
                    <TextInput placeholder="0" keyboardType="numeric" autoFocus={true} value={this._input}
                               onChangeText={this._onInputChange}/>
                </View>
                <View>
                    <CurrencySwitch value={this.state.to} onChange={this._toSymbol}/>
                    <TextInput editable={false} placeholder="0" keyboardType="numeric" value={this._result}/>
                </View>
            </View>
        );
    }
}

export default connector(ConverterPage)
