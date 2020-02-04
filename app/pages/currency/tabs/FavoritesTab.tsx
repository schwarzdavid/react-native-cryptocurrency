import React from "react";
import {StyleSheet} from "react-native";
import {RootState} from "../../../reducers/reducer";
import {connect, ConnectedProps} from "react-redux";
import {NavigationInjectedProps} from "react-navigation";
import ScrollTabLayout from "../layouts/ScrollTabLayout";
import {reloadFavoritesData, removeFavoriteAction} from "../../../reducers/favorites/actions";
import {Card} from "react-native-paper";
import {Text} from "react-native";
import HistoryChart from "../partials/HistoryChart";

const mapState = (state: RootState) => ({
    isLoading: state.favorites.isLoading,
    currencies: state.currency.currencies,
    favorites: state.favorites.favorites
});

const mapDispatch = {
    reload: reloadFavoritesData,
    removeFavorite: removeFavoriteAction
};

const connector = connect(mapState, mapDispatch);

interface IFavoritesTabProps extends NavigationInjectedProps, ConnectedProps<typeof connector> {
}

class FavoritesTab extends React.Component<IFavoritesTabProps> {
    componentDidMount(): void {
        this.props.reload();
    }

    renderFavoriteCards = (): React.ReactNode[] => {
        const cards = [];
        for (let [key, history] of Object.entries(this.props.favorites)) {
            if(this.props.currencies.hasOwnProperty(key)){
                const favCurrency = this.props.currencies[key];
                cards.push(
                    <Card key={key} style={styles.card}>
                        <Card.Title title={key} subtitle={favCurrency.name} />
                        <Card.Content>
                            <HistoryChart data={history}/>
                        </Card.Content>
                    </Card>
                );
            }
        }
        return cards;
    };

    render() {
        const {isLoading, reload, removeFavorite} = this.props;

        return (
            <ScrollTabLayout refreshing={isLoading} onRefresh={reload}>
                {this.renderFavoriteCards()}
            </ScrollTabLayout>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10
    }
});

export default connector(FavoritesTab);
