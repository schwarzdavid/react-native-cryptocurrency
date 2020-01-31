import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import RootReducer from "./reducer";

function configureStore() {
    return createStore(
        RootReducer,
        applyMiddleware(
            thunkMiddleware
        )
    );
}

export {configureStore};
