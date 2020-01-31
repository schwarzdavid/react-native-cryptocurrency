import {ThunkAction} from "redux-thunk";
import {ICurrencyState} from "./types";
import {Action} from "redux";

//*******************************************
// RELOAD ALL ACTION
//*******************************************
const RELOAD_ALL = 'CURRENCY_RELOAD_ALL';
interface ReloadAllAction extends Action<typeof RELOAD_ALL> {
    payload?: any
}
function reloadAllAction(): ThunkAction<Promise<ReloadAllAction>, ICurrencyState, {}, ReloadAllAction> {
    return async (dispatch) => {
        return dispatch({
            type: RELOAD_ALL,
            //payload: await ForexService.reloadAll()
        });
    };
}
export {RELOAD_ALL, ReloadAllAction, reloadAllAction}

//*******************************************
// EXPORT ACTION TYPE
//*******************************************
type CurrencyActionTypes = ReloadAllAction;
export {CurrencyActionTypes}
