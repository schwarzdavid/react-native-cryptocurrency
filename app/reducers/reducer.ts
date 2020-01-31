import {combineReducers} from "redux";
import FavoritesReducer from "./favorites/reducer";
import CurrencyReducer from "./currencies/reducer";

const RootReducer = combineReducers({
    FavoritesReducer,
    CurrencyReducer
});

export default RootReducer;
