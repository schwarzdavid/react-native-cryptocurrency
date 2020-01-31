import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import PersistedReducer from "./reducer";
import {persistStore} from 'redux-persist';

function configureStore() {
    const store = createStore(
        PersistedReducer,
        applyMiddleware(
            thunkMiddleware
        )
    );

    const persistor = persistStore(store);

    return {store, persistor};
}

export {configureStore};
