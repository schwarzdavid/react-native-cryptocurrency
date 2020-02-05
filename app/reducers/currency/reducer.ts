import {ICurrencyState} from "./types";
import {CurrencyActionTypes, SET_AVAILABLE_TRADES, SET_CURRENCIES, SET_LOADING_STATUS, SET_PRICES} from "./actions";
import {cloneDeep} from 'lodash';

const initialState: ICurrencyState = {
    currencies: {},
    availableTrades: {},
    prices: {},
    isLoading: false
};

export default function CurrencyReducer(state: ICurrencyState = initialState, action: CurrencyActionTypes): ICurrencyState {
    const clone = cloneDeep(state);
    switch (action.type) {
        case SET_LOADING_STATUS:
            clone.isLoading = action.status;
            break;
        case SET_CURRENCIES:
            clone.currencies = action.currencies;
            break;
        case SET_PRICES:
            console.log("i shouldnt be here");
            for (let [symbol, price] of Object.entries(action.prices)) {
                clone.prices[symbol] = price;
            }
            break;
        case SET_AVAILABLE_TRADES:
            clone.availableTrades = action.availableTrades;
            break;
    }
    return clone;
}
