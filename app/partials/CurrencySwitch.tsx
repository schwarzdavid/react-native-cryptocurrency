import React from "react";
import {Divider, Headline, Menu, Searchbar} from "react-native-paper";
import {RootState} from "../reducers/reducer";
import {connect, ConnectedProps} from "react-redux";
import {getAvailableCurrencies} from "../reducers/getter";
import {Keyboard, StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICurrencies} from "../reducers/currency/types";

const mapState = (state: RootState) => ({
    currencies: getAvailableCurrencies(state)
});

const connector = connect(mapState);

interface ILanguageSwitchState {
    menuVisible: boolean,
    searchResult: string[],
    searchText: string
}

interface ILanguageSwitchProps extends ConnectedProps<typeof connector> {
    value: string,
    onChange: (value: string) => void,
    right?: boolean,
    availableCurrencies?: string[]
    color?: string
}

class CurrencySwitch extends React.Component<ILanguageSwitchProps, ILanguageSwitchState> {
    private static readonly INITIAL_CURRENCIES = ['EUR', 'USD', 'CZK', 'PLN', 'BTC'];

    private get initialCurrencies(): string[] {
        if (Array.isArray(this.props.availableCurrencies)) {
            const output = CurrencySwitch.INITIAL_CURRENCIES.filter(symbol => {
                return this.props.availableCurrencies?.includes(symbol);
            });
            for (let i = output.length, j = 0; i < 5 && j < Object.keys(this.currencies).length; i++, j++) {
                const currencySymbol = Object.values(this.currencies)[j].shortName;
                if (!output.includes(currencySymbol)) {
                    output.push(currencySymbol);
                }
            }
            return output;
        }
        return CurrencySwitch.INITIAL_CURRENCIES;
    };

    private get currencies(): ICurrencies {
        if (Array.isArray(this.props.availableCurrencies)) {
            return Object.entries(this.props.currencies)
                .filter(([key,]) => {
                    return this.props.availableCurrencies?.includes(key);
                })
                .reduce((output, [key, currency]) => {
                    output[key] = currency;
                    return output;
                }, {} as ICurrencies)
        }
        return this.props.currencies;
    }

    private get color(): string {
        return this.props.color || '#000000';
    }

    state = {
        menuVisible: false,
        searchResult: this.initialCurrencies,
        searchText: ''
    };

    private _openMenu = (): void => {
        Keyboard.dismiss();
        this.setState({
            menuVisible: true
        });
    };

    private _closeMenu = (): void => {
        this.setState({
            menuVisible: false
        });
    };

    private _setValue = (newVal: string): void => {
        this.props.onChange(newVal);
        this._closeMenu();
    };

    private _searchForCurrencies = (_searchText: string): void => {
        const searchText = _searchText.toLowerCase();
        const result = Object.values(this.currencies)
            .map(currency => {
                let weight = 0;
                let position = -1;
                const symbol = currency.shortName.toLowerCase();
                const name = currency.name.toLowerCase();
                if (symbol.includes(searchText)) {
                    weight = 2;
                    position = symbol.indexOf(searchText);
                } else if (name.includes(searchText)) {
                    weight = 1;
                    position = name.indexOf(searchText);
                }
                return {currency, weight, position};
            })
            .sort((a, b) => {
                const weightDiff = Math.sign(b.weight - a.weight);
                if (weightDiff !== 0) {
                    return weightDiff;
                }
                return Math.sign(a.position - b.position);
            })
            .map(currency => currency.currency.shortName);
        result.length = Math.min(result.length, 10);
        this.setState({
            searchResult: result,
            searchText: _searchText
        });
    };

    private _renderMenuItems = (symbols: string[] = this.state.searchResult): React.ReactNode[] => {
        return symbols.map(symbol => {
            return <Menu.Item onPress={() => this._setValue(symbol)} title={symbol} key={symbol}/>
        });
    };

    render() {
        const anchorStyles: object[] = [styles.anchor];
        if (this.props.right) {
            anchorStyles.push(styles.reversedAnchor);
        }

        return (
            <Menu visible={this.state.menuVisible}
                  anchor={
                      <View style={anchorStyles}>
                          <Headline onPress={this._openMenu} style={{color: this.color}}>{this.props.value}</Headline>
                          <Icon name="chevron-down" size={25} color={this.color}/>
                      </View>
                  }
                  onDismiss={this._closeMenu}
                  style={styles.menu}>
                <Searchbar
                    placeholder="Search"
                    value={this.state.searchText}
                    style={styles.searchbar}
                    onChangeText={this._searchForCurrencies}/>
                <Divider/>
                {this._renderMenuItems()}
            </Menu>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        width: 200
    },
    searchbar: {
        backgroundColor: 'transparent',
        elevation: 0
    },
    anchor: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    reversedAnchor: {
        flexDirection: 'row-reverse'
    }
});

export default connector(CurrencySwitch)
