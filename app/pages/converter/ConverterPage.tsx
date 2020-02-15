import React from "react";
import {TextInput, View, StyleSheet, Keyboard} from "react-native";
import {NavigationScreenProp} from "react-navigation";
import CurrencySwitch from "../../partials/CurrencySwitch";
import {RootState} from "../../reducers/reducer";
import {connect, ConnectedProps} from "react-redux";
import {ActivityIndicator, Button, Card, FAB, Modal, Portal, Subheading, Title} from "react-native-paper";
import {reloadPriceAction} from "../../reducers/currency/actions";
import {ICurrency} from "../../reducers/currency/types";

const mapState = (state: RootState) => ({
    baseCurrency: state.settings.baseCurrency,
    prices: state.currency.prices,
    currencies: state.currency.currencies,
    priceLoading: state.currency.isLoading
});

const mapActions = {
    reloadPrice: reloadPriceAction
};

const connector = connect(mapState, mapActions);

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
    private elInput: React.RefObject<TextInput> = React.createRef();

    private _toSymbol: CurrencyAccessor = (value?: string): any => {
        if (value) {
            this.setState({
                to: value
            }, this._ensurePriceIsLoaded);
            return;
        }
        return this.state?.to ?? this.props.navigation.getParam('to') ?? this.props.baseCurrency;
    };

    private _fromSymbol: CurrencyAccessor = (value?: string): any => {
        if (value) {
            this.setState({
                from: value
            }, this._ensurePriceIsLoaded);
            return;
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
        }
        return 1;
    }

    private get _isReversePriceAvailable(): boolean {
        return this.props.currencies[this.state.to].availableTrades.includes(this.state.from);
    }

    private get _result(): string {
        if (this.state.input === '') {
            return this.state.input;
        }
        const unformattedInput = this.state.input.replace(/\s/g, '');
        const result = parseFloat(unformattedInput) * this._price;
        return this._formatNumber(result.toString());
    }

    private get _input(): string {
        if (this.state.input === '') {
            return this.state.input;
        }
        return this.state.input;
    }

    private get _fromCurrency(): ICurrency {
        return this.props.currencies[this.state.from];
    }

    private get _toCurrency(): ICurrency {
        return this.props.currencies[this.state.to];
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
            output += '.' + comma.substr(0, 2);
        } else if (text.endsWith('.')) {
            output += '.';
        }
        return output;
    };

    private _reverseCurrencies = () => {
        this.setState((prevState) => {
            return {
                from: prevState.to,
                to: prevState.from,
                input: ''
            }
        }, this._ensurePriceIsLoaded);
    };

    private _ensurePriceIsLoaded = async () => {
        const symbol = this.state.from + '/' + this.state.to;
        if (!this.props.prices.hasOwnProperty(symbol)) {
            Keyboard.dismiss();
            await this.props.reloadPrice(symbol);
            this.forceUpdate();
            this.elInput?.current?.focus();
        }
    };

    render() {
        return (
            <View>
                <View style={[styles.row, styles.fromCurrency]}>
                    <View>
                        <CurrencySwitch value={this.state.from} onChange={this._fromSymbol}
                                        availableCurrencies={this._toCurrency.availableTrades}/>
                        <Subheading style={styles.caption}>{this._fromCurrency.name}</Subheading>
                    </View>
                    <TextInput placeholder="0" keyboardType="numeric" autoFocus={true} value={this._input}
                               onChangeText={this._onInputChange} style={styles.input} ref={this.elInput}/>
                </View>
                <View style={[styles.row, styles.controls]}>
                    <FAB icon="swap-vertical" small disabled={!this._isReversePriceAvailable}
                         onPress={this._reverseCurrencies}/>
                    <Button icon="trending-up" style={styles.price}
                            mode="contained">1 {this.state.from} = {this._price} {this.state.to}</Button>
                </View>
                <View style={[styles.row, styles.toCurrency]}>
                    <View>
                        <CurrencySwitch value={this.state.to} onChange={this._toSymbol}
                                        availableCurrencies={this._fromCurrency.availableTrades}/>
                        <Subheading style={styles.caption}>{this._toCurrency.name}</Subheading>
                    </View>
                    <TextInput editable={false} placeholder="0" keyboardType="numeric" value={this._result}
                               style={[styles.input, styles.output]}/>
                </View>
                <Portal>
                    <Modal visible={this.props.priceLoading} dismissable={false}>
                        <Card style={styles.loadingCard}>
                            <Title>Price loading</Title>
                            <ActivityIndicator animating={true} size="large" style={{marginTop: 10}}/>
                        </Card>
                    </Modal>
                </Portal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fromCurrency: {
        backgroundColor: '#ffffff',
        paddingTop: 60,
        paddingBottom: 80
    },
    toCurrency: {
        paddingTop: 60
    },
    controls: {
        marginTop: -20
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        fontSize: 40
    },
    output: {
        color: '#555555'
    },
    caption: {
        color: '#aaaaaa'
    },
    price: {
        borderRadius: 9999
    },
    loadingCard: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        marginHorizontal: 40,
        flexGrow: 0
    }
});

export default connector(ConverterPage)
