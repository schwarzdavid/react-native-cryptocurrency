import React from "react";
import {StyleSheet} from "react-native";
import {RootState} from "../../../reducers/reducer";
import {connect, ConnectedProps} from "react-redux";
import {NavigationInjectedProps} from "react-navigation";
import ScrollTabLayout from "../layouts/ScrollTabLayout";
import {reloadFavoritesAction, removeFavoriteAction} from "../../../reducers/favorites/actions";
import {ActivityIndicator, Card} from "react-native-paper";
import HistoryChart from "../partials/HistoryChart";
import {getFavorites} from "../../../reducers/getter";

const mapState = (state: RootState) => ({
    favorites: getFavorites(state)
});

const mapDispatch = {
    reload: reloadFavoritesAction,
    removeFavorite: removeFavoriteAction
};

const connector = connect(mapState, mapDispatch);

interface IFavoritesTabProps extends NavigationInjectedProps, ConnectedProps<typeof connector> {
}

class FavoritesTab extends React.Component<IFavoritesTabProps> {
    renderFavoriteCards = (): React.ReactNode[] => {
        const cards = [];
        for (let favorite of this.props.favorites) {
            cards.push(
                <Card key={favorite.tradeSymbol} style={styles.card}>
                    <Card.Title title={favorite.tradeSymbol} subtitle={favorite.from.name + ' - ' + favorite.to.name}
                                right={() => <ActivityIndicator size='small' style={{marginRight:15}} animating={favorite.isLoading}/>}/>
                    <Card.Content>
                        <HistoryChart data={favorite}/>
                    </Card.Content>
                </Card>
            );
        }
        return cards;
    };

    render() {
        const {reload} = this.props;

        return (
            <ScrollTabLayout onRefresh={reload}>
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
