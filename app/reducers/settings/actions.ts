import {ThunkAction} from "redux-thunk";
import {ISettingsState} from "./types";
import ApiService from "../../services/ApiService";
import {Action} from "redux";

//*******************************************
// SET CRYPTO CURRENCIES
//*******************************************
const SET_CURRENCIES = 'SET_CURRENCIES';

interface SetCurrenciesAction extends Action<typeof SET_CURRENCIES> {
    currencies: any
}

export {SET_CURRENCIES, SetCurrenciesAction}

//*******************************************
// RELOAD CURRENCIES ACTION
//*******************************************
function reloadCurrenciesAction(): ThunkAction<Promise<void>, ISettingsState, {}, SetCurrenciesAction> {
    return async (dispatch) => {
        const currencies = await ApiService.getSymbols();
        dispatch({
            type: SET_CURRENCIES,
            currencies
        });
    };
}

export {reloadCurrenciesAction}

//*******************************************
// EXPORT ACTION TYPE
//*******************************************
type CurrencyActionTypes = SetCurrenciesAction;
export {CurrencyActionTypes}
