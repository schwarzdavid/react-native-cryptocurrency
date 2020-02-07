import {IFavoritesState} from "./types";
import {FavoritesActions, SET_HISTORY, SET_LOADING_STATUS, CREATE_FAVORITE, REMOVE_FAVORITE} from "./actions";

const DEFAULT_HISTORY_DECIMALS = 3;

const initialState: IFavoritesState = {
    favorites: {}
};

export default function FavoritesReducer(state: IFavoritesState = initialState, action: FavoritesActions): IFavoritesState {
    const clone = Object.assign({}, initialState, state);
    switch (action.type) {
        case CREATE_FAVORITE:
            if (!clone.favorites.hasOwnProperty(action.symbol)) {
                clone.favorites[action.symbol] = {
                    history: [],
                    decimals: DEFAULT_HISTORY_DECIMALS,
                    isLoading: false
                };
            }
            break;
        case REMOVE_FAVORITE:
            delete clone.favorites[action.symbol];
            break;
        case SET_LOADING_STATUS:
            if (clone.favorites.hasOwnProperty(action.symbol)) {
                clone.favorites[action.symbol].isLoading = action.status;
            }
            break;
        case SET_HISTORY:
            Object.entries(action.history).forEach(([symbol, history]) => {
                if (clone.favorites.hasOwnProperty(symbol)) {
                    clone.favorites[symbol].history = history.history;
                    clone.favorites[symbol].decimals = history.decimals;
                }
            });
            break;
    }
    return clone;
}
