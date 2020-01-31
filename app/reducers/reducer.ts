import {combineReducers} from "redux";
import FavoritesReducer from "./favorites/reducer";
import CurrencyReducer from "./currency/reducer";
import SettingsReducer from "./settings/reducer";
import {AsyncStorage} from 'react-native';
import {persistReducer} from "redux-persist";

const persistConfig = {
    storage: AsyncStorage,
    key: 'redux'
};

const RootReducer = combineReducers({
    FavoritesReducer,
    CurrencyReducer,
    SettingsReducer
});

const PersistedReducer = persistReducer(persistConfig, RootReducer);

export default PersistedReducer;
