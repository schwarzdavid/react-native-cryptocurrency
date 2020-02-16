import React from "react";
import {StyleSheet, ToastAndroid, View} from "react-native";
import {RootState} from "../../../reducers/reducer";
import {connect, ConnectedProps} from "react-redux";
import {NavigationInjectedProps, withNavigation} from "react-navigation";
import ScrollTabLayout from "../layouts/ScrollTabLayout";
import {reloadFavoritesAction, removeFavoriteAction} from "../../../reducers/favorites/actions";
import {ActivityIndicator, Card, Headline, IconButton} from "react-native-paper";
import HistoryChart from "../partials/HistoryChart";
import {getFavorites, IFavoriteDTO} from "../../../reducers/getter";
import {SCREEN} from "../../../types/screen";
import {GREEN_PALETTE} from "../../../Theme";

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
    private _onCardPress = (favorite: IFavoriteDTO): void => {
        this.props.navigation.navigate(SCREEN.CONVERTER, {
            to: favorite.to.shortName,
            from: favorite.from.shortName
        });
    };

    removeFavorite = (favorite: IFavoriteDTO): void => {
        this.props.removeFavorite(favorite.tradeSymbol);
        ToastAndroid.show('Favorite removed', ToastAndroid.SHORT);
    };

    renderButtonAction = (favorite: IFavoriteDTO): React.ReactNode => {
        if (favorite.isLoading) {
            return (
                <ActivityIndicator size='small' style={{marginRight: 15}} animating={true}/>
            );
        }
        return (
            <IconButton icon="delete" size={24} onPress={() => this.removeFavorite(favorite)}/>
        );
    };

    renderFavoriteCards = (): React.ReactNode[] => {
        const cards = [];
        for (let favorite of this.props.favorites) {
            cards.push(
                <Card key={favorite.tradeSymbol} style={styles.card} onPress={() => this._onCardPress(favorite)}>
                    <Card.Title title={favorite.tradeSymbol} subtitle={favorite.from.name + ' - ' + favorite.to.name}
                                right={() => this.renderButtonAction(favorite)}/>
                    <Card.Content>
                        <HistoryChart data={favorite}/>
                    </Card.Content>
                </Card>
            );
        }
        return cards;
    };

    renderNoFavorites = (): React.ReactNode | void => {
        if (!this.props.favorites.length) {
            return (
                <View style={styles.centric}>
                    <Headline>No Favorites added yet</Headline>
                </View>
            );
        }
    };

    render() {
        const {reload} = this.props;

        return (
            <ScrollTabLayout onRefresh={reload} color={GREEN_PALETTE}>
                {this.renderFavoriteCards()}
                {this.renderNoFavorites()}
            </ScrollTabLayout>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 10
    },
    centric: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});

export default withNavigation(connector(FavoritesTab));
