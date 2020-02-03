import {IFavoritesState} from "./types";
import {FavoritesActions, SET_HISTORY, SET_LOADING_STATUS, TOGGLE_FAVORITE} from "./actions";
import {cloneDeep} from "lodash";

const initialState: IFavoritesState = {
    favorites: {},
    isLoading: false
};

export default function FavoritesReducer(state: IFavoritesState = initialState, action: FavoritesActions): IFavoritesState {
    const clone = cloneDeep(state);
    switch (action.type) {
        case TOGGLE_FAVORITE:
            console.log(action.key);
            if(clone.favorites.hasOwnProperty(action.key)){
                delete clone.favorites[action.key];
            } else {
                clone.favorites[action.key] = {};
            }
            break;
        case SET_LOADING_STATUS:
            clone.isLoading = action.status;
            break;
        case SET_HISTORY:
            console.log(action.history);
            break;
    }
    return clone;
}
