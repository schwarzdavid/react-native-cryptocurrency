import {ICurrencyState} from "./types";
import {CurrencyActionTypes, SET_CURRENCIES, SET_LOADING_STATUS, SET_PRICES} from "./actions";
import {cloneDeep} from 'lodash';

const initialState: ICurrencyState = {
    currencies: {},
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
            for (let [symbol, price] of Object.entries(action.prices)) {
                clone.prices[symbol] = price;
            }
            break;
    }
    return clone;
}
