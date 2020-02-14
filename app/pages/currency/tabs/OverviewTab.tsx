import React from "react";
import {StyleSheet, Text, ToastAndroid, View} from "react-native";
import ScrollTabLayout from "../layouts/ScrollTabLayout";
import {NavigationInjectedProps, withNavigation} from "react-navigation";
import {connect, ConnectedProps} from "react-redux";
import {reloadPricesAction} from "../../../reducers/currency/actions";
import {RootState} from "../../../reducers/reducer";
import {Card, Headline} from "react-native-paper";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";
import {addFavoriteAction, removeFavoriteAction} from "../../../reducers/favorites/actions";
import {getPrices, IPriceDTO} from "../../../reducers/getter";
import LanguageSwitch from "../../../partials/CurrencySwitch";
import {setBaseCurrencyAction} from "../../../reducers/settings/actions";
import {SCREEN} from "../../../types/screen";

const mapState = (state: RootState) => ({
    isLoading: state.currency.isLoading,
    prices: getPrices(state),
    baseCurrency: state.settings.baseCurrency
});

const mapDispatch = {
    reloadPrices: reloadPricesAction,
    addFavorite: addFavoriteAction,
    removeFavorite: removeFavoriteAction,
    setBaseCurrency: setBaseCurrencyAction
};

const connector = connect(mapState, mapDispatch);

interface IOverviewTabProps extends NavigationInjectedProps, ConnectedProps<typeof connector> {
}

class OverviewTab extends React.Component<IOverviewTabProps> {
    componentDidMount(): void {
        this.props.reloadPrices();
    }

    componentDidUpdate(prevProps: Readonly<IOverviewTabProps>): void {
        if (prevProps.baseCurrency !== this.props.baseCurrency) {
            if (this.props.prices.length === 0) {
                this.props.reloadPrices();
            }
        }
    }

    private _toggleFavorite = (price: IPriceDTO): void => {
        if (price.isFavorite) {
            this.props.removeFavorite(price.tradeSymbol);
            ToastAndroid.show('Favorite removed', ToastAndroid.SHORT);
        } else {
            this.props.addFavorite(price.tradeSymbol);
            ToastAndroid.show('Favorite added', ToastAndroid.SHORT);
        }
    };

    private _setBaseCurrency = (symbol: string): void => {
        this.props.setBaseCurrency(symbol);
    };

    private _onCardPress = (price: IPriceDTO): void => {
        this.props.navigation.navigate(SCREEN.CONVERTER, {
            to: price.to.shortName,
            from: price.from.shortName
        });
    };

    private _renderPriceCards = (): React.ReactNode[] => {
        const cards: React.ReactNode[] = [];
        for (let price of this.props.prices) {
            cards.push(
                <Card key={price.tradeSymbol} style={styles.card} onPress={() => this._onCardPress(price)}>
                    <Card.Title title={price.to.shortName} subtitle={price.to.name}
                                right={() => <Icon name={price.isFavorite ? 'star' : 'star-outline'} size={30}
                                                   style={styles.star} color={price.isFavorite ? 'gold' : '#000000'}
                                                   onPress={() => this._toggleFavorite(price)}/>}/>
                    <Card.Content>
                        <Text key="from">1 {price.from.shortName} = {price.value.toFixed(4)} {price.to.shortName}</Text>
                        <Text
                            key="to">1 {price.to.shortName} = {(1 / price.value).toFixed(4)} {price.from.shortName}</Text>
                    </Card.Content>
                </Card>
            );
        }
        return cards;
    };

    render() {
        return (
            <ScrollTabLayout refreshing={this.props.isLoading} onRefresh={this.props.reloadPrices}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                    <Headline>Language:</Headline>
                    <LanguageSwitch value={this.props.baseCurrency} onChange={this._setBaseCurrency}/>
                </View>
                {this._renderPriceCards()}
            </ScrollTabLayout>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10
    },
    star: {
        marginRight: 10
    },
    lastUpdated: {
        marginBottom: 10,
        opacity: 0.4
    }
});

export default withNavigation(connector(OverviewTab));
