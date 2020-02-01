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
    favorites: FavoritesReducer,
    currency: CurrencyReducer,
    settings: SettingsReducer
});

type RootState = ReturnType<typeof RootReducer>

const PersistedReducer = persistReducer(persistConfig, RootReducer);

export default PersistedReducer;
export {RootState}
