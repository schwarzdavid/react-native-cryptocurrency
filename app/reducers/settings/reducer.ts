import {ISettingsState} from "./types";
import {CurrencyActionTypes, SET_CURRENCIES} from "./actions";
import {cloneDeep} from 'lodash';

const initialState: ISettingsState = {
    baseCurrency: 'EUR',
    currencies: []
};

function SettingsReducer(state: ISettingsState = initialState, action: CurrencyActionTypes): ISettingsState {
    const clone = cloneDeep(state);
    switch (action.type) {
        case SET_CURRENCIES:
            clone.currencies = action.currencies;
            break;
    }
    return clone;
}

export default SettingsReducer;
