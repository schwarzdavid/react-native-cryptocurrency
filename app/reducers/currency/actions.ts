import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import ApiService from "../../services/ApiService";
import {RootState} from "../reducer";
import {IPrice} from "./types";

//*******************************************
// SET PRICE ACTION
//*******************************************
const SET_PRICES = 'SET_PRICES';

interface ISetPricesAction extends Action<typeof SET_PRICES> {
    prices: { [key: string]: IPrice },
    base: string
}

function setPricesAction(base: string, prices: { [key: string]: IPrice }): ISetPricesAction {
    return {
        type: SET_PRICES,
        prices,
        base
    };
}

export {SET_PRICES, ISetPricesAction, setPricesAction}


//*******************************************
// SET LOADING STATUS ACTION
//*******************************************
const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

interface ISetLoadingStatusAction extends Action<typeof SET_LOADING_STATUS> {
    status: boolean
}

function setLoadingStatusAction(status: boolean): ISetLoadingStatusAction {
    return {
        type: SET_LOADING_STATUS,
        status
    };
}

export {SET_LOADING_STATUS, ISetLoadingStatusAction, setLoadingStatusAction}


//*******************************************
// SET CURRENCIES ACTION
//*******************************************
const SET_CURRENCIES = 'SET_CURRENCIES';

interface ISetCurrenciesAction extends Action<typeof SET_CURRENCIES> {
    currencies: any
}

function setCurrenciesAction(currencies: any): ISetCurrenciesAction {
    return {
        type: SET_CURRENCIES,
        currencies
    }
}

export {SET_CURRENCIES, ISetCurrenciesAction}

//*******************************************
// RELOAD CURRENCIES ACTION
//*******************************************
function reloadCurrenciesAction(): ThunkAction<Promise<void>, RootState, {}, ISetCurrenciesAction> {
    return async (dispatch) => {
        const currencies = await ApiService.getCurrenciesAndPrices();
        dispatch(setCurrenciesAction(currencies));
    };
}

export {reloadCurrenciesAction}


//*******************************************
// LOAD PRICE ACTION
//*******************************************
function reloadPricesAction(): ThunkAction<Promise<void>, RootState, {}, Action> {
    return async (dispatch, getState) => {
        dispatch(setLoadingStatusAction(true));
        const state = getState();
        const requiredPriceSymbols = Object.keys(state.currency.currencies[state.settings.baseCurrency].tradeCurrencies)
            .filter(key => state.currency.currencies.hasOwnProperty(key))
            .map(key => [state.settings.baseCurrency, key].join('/'));
        const prices = await ApiService.getPrices(requiredPriceSymbols);
        dispatch(setPricesAction(state.settings.baseCurrency, prices));
        dispatch(setLoadingStatusAction(false));
    };
}

export {reloadPricesAction}


//*******************************************
// EXPORT ACTION TYPE
//*******************************************
type CurrencyActionTypes = ISetPricesAction | ISetLoadingStatusAction | ISetCurrenciesAction;
export {CurrencyActionTypes}
