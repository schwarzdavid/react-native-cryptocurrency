import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import ApiService from "../../services/ApiService";
import {RootState} from "../reducer";
import {ICurrencies, IPrices} from "./types";


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
// SET PRICE ACTION
//*******************************************
const SET_PRICES = 'SET_PRICES';

interface ISetPricesAction extends Action<typeof SET_PRICES> {
    prices: IPrices
}

function setPricesAction(prices: IPrices): ISetPricesAction {
    return {
        type: SET_PRICES,
        prices
    };
}

export {SET_PRICES, ISetPricesAction, setPricesAction}


//*******************************************
// SET CURRENCIES ACTION
//*******************************************
const SET_CURRENCIES = 'SET_CURRENCIES';

interface ISetCurrenciesAction extends Action<typeof SET_CURRENCIES> {
    currencies: ICurrencies
}

function setCurrenciesAction(currencies: ICurrencies): ISetCurrenciesAction {
    return {
        type: SET_CURRENCIES,
        currencies
    }
}

export {SET_CURRENCIES, ISetCurrenciesAction, setCurrenciesAction}

//*******************************************
// RELOAD CURRENCIES ACTION
//*******************************************
function reloadCurrencies(): ThunkAction<Promise<void>, RootState, {}, Action> {
    return async (dispatch) => {
        dispatch(setLoadingStatusAction(true));
        const currencies = await ApiService.getCurrencies();
        dispatch(setCurrenciesAction(currencies));
        dispatch(setLoadingStatusAction(false));
    };
}

export {reloadCurrencies}


//*******************************************
// LOAD PRICE ACTION
//*******************************************
function reloadPricesAction(): ThunkAction<Promise<void>, RootState, {}, Action> {
    return async (dispatch, getState) => {
        const state = getState();
        const baseCurrency = state.currency.currencies[state.settings.baseCurrency];
        if (baseCurrency) {
            dispatch(setLoadingStatusAction(true));
            const requiredPriceSymbols = baseCurrency.availableTrades
                .map(symbol => state.settings.baseCurrency + '/' + symbol);
            const prices = await ApiService.getPrices(requiredPriceSymbols);
            dispatch(setPricesAction(prices));
            dispatch(setLoadingStatusAction(false));
        }
    };
}

export {reloadPricesAction}


//*******************************************
// EXPORT ACTION TYPE
//*******************************************
type CurrencyActionTypes =
    ISetPricesAction
    | ISetLoadingStatusAction
    | ISetCurrenciesAction;
export {CurrencyActionTypes}
