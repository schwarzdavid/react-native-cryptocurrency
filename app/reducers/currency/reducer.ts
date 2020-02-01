import {ICurrencyState} from "./types";
import {CurrencyActionTypes, SET_CURRENCIES, SET_LOADING_STATUS, SET_PRICES} from "./actions";
import {cloneDeep} from 'lodash';

const initialState: ICurrencyState = {
    currencies: {},
    isLoading: false,
    lastUpdated: null
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
            if (!clone.currencies.hasOwnProperty(action.base)) {
                throw new Error(`Invalid Base-Symbol "${action.base}"`);
            }
            const tradeCurrencies = clone.currencies[action.base].tradeCurrencies;
            for (let i in tradeCurrencies) {
                if (action.prices.hasOwnProperty(i)) {
                    tradeCurrencies[i] = action.prices[i];
                } else {
                    tradeCurrencies[i] = null;
                }
            }
            clone.lastUpdated = Date.now();
            break;
    }
    return clone;
}
