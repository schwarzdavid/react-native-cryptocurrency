import {ICurrencyState} from "./types";
import {CurrencyActionTypes, RELOAD_ALL} from "./actions";

const initialState: ICurrencyState = {
    currencies: []
};

export default function CurrencyReducer(state: ICurrencyState = initialState, action: CurrencyActionTypes): ICurrencyState {
    switch (action.type) {
        case RELOAD_ALL:
            // TODO: DO SMTH
            break;
    }
    return state;
}
