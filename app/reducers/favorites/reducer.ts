import {IFavoritesState} from "./types";
import {FavoritesActions, SET_HISTORY, SET_LOADING_STATUS, TOGGLE_FAVORITE} from "./actions";

const DEFAULT_HISTORY_DECIMALS = 3;

const initialState: IFavoritesState = {
    favorites: {},
    isLoading: false
};

export default function FavoritesReducer(state: IFavoritesState = initialState, action: FavoritesActions): IFavoritesState {
    const clone = Object.assign({}, initialState, state);
    switch (action.type) {
        case TOGGLE_FAVORITE:
            if(clone.favorites.hasOwnProperty(action.key)){
                delete clone.favorites[action.key];
            } else {
                clone.favorites[action.key] = {
                    history: [],
                    decimals: DEFAULT_HISTORY_DECIMALS
                };
            }
            break;
        case SET_LOADING_STATUS:
            clone.isLoading = action.status;
            break;
        case SET_HISTORY:
            for(let i in action.history){
                if(clone.favorites.hasOwnProperty(i)) {
                    clone.favorites[i] = action.history[i];
                }
            }
            break;
    }
    return clone;
}
