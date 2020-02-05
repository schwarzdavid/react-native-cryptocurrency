import React from "react";
import {Text, StyleSheet} from "react-native";
import ScrollTabLayout from "../layouts/ScrollTabLayout";
import {NavigationInjectedProps} from "react-navigation";
import {connect, ConnectedProps} from "react-redux";
import moment from "moment";
import {reloadPricesAction} from "../../../reducers/currency/actions";
import {RootState} from "../../../reducers/reducer";
import {Card} from "react-native-paper";
import {IPrice} from "../../../reducers/currency/types";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";
import {toggleFavoriteAction} from "../../../reducers/favorites/actions";
import {getCurrentPrices} from "../../../reducers/currency/getter";

const mapState = (state: RootState) => ({
    isLoading: state.currency.isLoading,
    prices: getCurrentPrices(state),
    currencies: state.currency.currencies,
    isFavorite: (key: string) => state.favorites.favorites.hasOwnProperty(key)
});

const mapDispatch = {
    reload: reloadPricesAction,
    toggleFavorite: toggleFavoriteAction
};

const connector = connect(mapState, mapDispatch);

interface IOverviewTabProps extends NavigationInjectedProps, ConnectedProps<typeof connector> {
}

class OverviewTab extends React.Component<IOverviewTabProps> {
    componentDidMount(): void {
        if (!this.props.lastUpdated) {
            this.props.reload();
        }
    }

    renderPriceCards = (): React.ReactNode[] => {
        const cards = [];
        for (let [key, currency] of Object.entries(this.props.currency.tradeCurrencies)) {
            if (currency) {
                const price = (this.props.currency.tradeCurrencies[key] as IPrice).price;
                const isFavorite = this.props.isFavorite(key);
                cards.push(
                    <Card key={key} style={styles.card}>
                        <Card.Title title={key} subtitle={this.props.currencies[key].name}
                                    right={() => <Icon name={isFavorite ? 'star' : 'star-outline'} size={30}
                                                       style={styles.star} color={isFavorite ? 'gold' : '#000000'}
                                                       onPress={() => this.props.toggleFavorite(key)}/>}/>
                        <Card.Content>
                            <Text key="from">1 {this.props.currency.shortName} = {price.toFixed(4)} {key}</Text>
                            <Text key="to">1 {key} = {(1 / price).toFixed(4)} {this.props.currency.shortName}</Text>
                        </Card.Content>
                    </Card>
                );
            }
        }
        return cards;
    };

    render() {
        return (
            <ScrollTabLayout refreshing={this.props.isLoading} onRefresh={this.props.reload}>
                {this.renderPriceCards()}
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

export default connector(OverviewTab)
