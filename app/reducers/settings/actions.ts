import {ThunkAction} from "redux-thunk";
import {ISettingsState} from "./types";
import {Action} from "redux";

//*******************************************
// SET BASE CURRENCY ACTION
//*******************************************
const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';

interface ISetBaseCurrencyAction extends Action<typeof SET_BASE_CURRENCY> {
    symbol: string
}

function setBaseCurrencyAction(symbol: string): ISetBaseCurrencyAction {
    return {
        type: SET_BASE_CURRENCY,
        symbol
    };
}

export {SET_BASE_CURRENCY, ISetBaseCurrencyAction, setBaseCurrencyAction}

//*******************************************
// EXPORT ACTION TYPE
//*******************************************
type SettingsActionTypes = ISetBaseCurrencyAction;
export {SettingsActionTypes}
