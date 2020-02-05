import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import ApiService from "../../services/ApiService";
import {RootState} from "../reducer";
import {IAvailableTrades, ICurrencies, IPrice, IPrices} from "./types";


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
// SET AVAILABLE TRADES ACTION
//*******************************************
const SET_AVAILABLE_TRADES = 'SET_AVAILABLE_TRADES';

interface ISetAvailableTradesAction extends Action<typeof SET_AVAILABLE_TRADES> {
    availableTrades: IAvailableTrades
}

function setAvailableTradesAction(availableTrades: IAvailableTrades): ISetAvailableTradesAction {
    return {
        type: SET_AVAILABLE_TRADES,
        availableTrades
    }
}

export {SET_AVAILABLE_TRADES, ISetAvailableTradesAction, setAvailableTradesAction}


//*******************************************
// RELOAD CURRENCIES ACTION
//*******************************************
function loadInitialValues(): ThunkAction<Promise<void>, RootState, {}, Action> {
    return async (dispatch) => {
        dispatch(setLoadingStatusAction(true));
        const {currencies, availableTrades} = await ApiService.getInitialValues();
        dispatch(setCurrenciesAction(currencies));
        dispatch(setAvailableTradesAction(availableTrades));
        dispatch(setLoadingStatusAction(false));
    };
}

export {loadInitialValues}


//*******************************************
// LOAD PRICE ACTION
//*******************************************
function reloadPricesAction(): ThunkAction<Promise<void>, RootState, {}, Action> {
    return async (dispatch, getState) => {
        dispatch(setLoadingStatusAction(true));
        const state = getState();
        const requiredPriceSymbols = Object.keys(state.currency.availableTrades[state.settings.baseCurrency])
            .map(symbol => state.settings.baseCurrency + '/' + symbol);
        const prices = await ApiService.getPrices(requiredPriceSymbols);
        dispatch(setPricesAction(prices));
        dispatch(setLoadingStatusAction(false));
    };
}

export {reloadPricesAction}


//*******************************************
// EXPORT ACTION TYPE
//*******************************************
type CurrencyActionTypes =
    ISetPricesAction
    | ISetLoadingStatusAction
    | ISetCurrenciesAction
    | ISetAvailableTradesAction;
export {CurrencyActionTypes}
