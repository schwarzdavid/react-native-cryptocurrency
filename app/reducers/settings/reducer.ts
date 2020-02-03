import {ISettingsState} from "./types";
import {SettingsActionTypes, SET_BASE_CURRENCY} from "./actions";
import {cloneDeep} from 'lodash';

const initialState: ISettingsState = {
    baseCurrency: 'USD'
};

function SettingsReducer(state: ISettingsState = initialState, action: SettingsActionTypes): ISettingsState {
    const clone = cloneDeep(state);
    switch (action.type) {
        case SET_BASE_CURRENCY:
            clone.baseCurrency = action.symbol;
            break;
    }
    return clone;
}

export default SettingsReducer;
