import {ICurrencyState} from "./types";
import {CurrencyActionTypes, RELOAD_ALL} from "./actions";
import {cloneDeep} from 'lodash';

const initialState: ICurrencyState = {
    currencies: [],
    isLoading: false,
    baseCurrency: 'EUR'
};

export default function CurrencyReducer(state: ICurrencyState = initialState, action: CurrencyActionTypes): ICurrencyState {
    const clone = cloneDeep(state);
    switch (action.type) {
        case RELOAD_ALL:
            clone.lastUpdated = Date.now();
            break;
    }
    return clone;
}
