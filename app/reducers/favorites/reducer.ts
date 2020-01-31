import {IFavoritesState} from "./types";
import {ADD, FavoritesActions} from "./actions";

const initialState = {};

export default function FavoritesReducer(state: IFavoritesState = initialState, action: FavoritesActions): IFavoritesState {
    switch (action.type) {
        case ADD:
            break;
    }
    return state;
}
