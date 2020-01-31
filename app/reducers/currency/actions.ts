import {ThunkAction} from "redux-thunk";
import {ICurrencyState} from "./types";

const RELOAD_ALL = 'CURRENCY_RELOAD_ALL';
interface ReloadAllAction {
    type: typeof RELOAD_ALL,
    payload?: any
}
function reloadAll(): ThunkAction<Promise<void>, ICurrencyState, {}, ReloadAllAction> {
    return async (dispatch) => {
        const exchanges = await fetch('https://api.exchangeratesapi.io/latest').then(res => res.json());
        dispatch({
            type: RELOAD_ALL,
            payload: exchanges
        });
    };
}
export {RELOAD_ALL, ReloadAllAction, reloadAll}

const RELOAD_ONE = 'CURRENCY_RELOAD_ONE';
interface ReloadOneAction {
    type: typeof RELOAD_ONE,
    payload?: any
}
function reloadOne(id: number): ReloadOneAction {
    // TODO: DO ME
    return {
        type: RELOAD_ONE
    };
}


type CurrencyActionTypes = ReloadAllAction | ReloadOneAction;
export {CurrencyActionTypes}
