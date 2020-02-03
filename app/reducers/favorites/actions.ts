import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducer";
import ApiService from "../../services/ApiService";

//*******************************************
// TOGGLE FAVORITE ACTION
//*******************************************
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITES';

interface IToggleFavoriteAction extends Action<typeof TOGGLE_FAVORITE> {
    key: string
}

function toggleFavoriteAction(key: string): IToggleFavoriteAction {
    return {
        type: TOGGLE_FAVORITE,
        key
    };
}

export {TOGGLE_FAVORITE, IToggleFavoriteAction, toggleFavoriteAction}


//*******************************************
// SET LOADING STATE
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
// SET HISTORY DATA
//*******************************************
const SET_HISTORY = 'SET_HISTORY';

interface ISetHistoryAction extends Action<typeof SET_HISTORY> {
    history: { [key: string]: any }
}

function setHistoryAction(history: { [key: string]: any }): ISetHistoryAction {
    return {
        type: SET_HISTORY,
        history
    };
}

export {SET_HISTORY, ISetHistoryAction, setHistoryAction}


//*******************************************
// LOAD FAVORITES DATA
//*******************************************
function reloadFavoritesData(): ThunkAction<Promise<void>, RootState, {}, Action> {
    return async (dispatch, getState) => {
        dispatch(setLoadingStatusAction(true));
        const state = getState();
        const requiredCurrencySymbols = Object.keys(state.favorites.favorites).map(favoriteKey => {
            return [state.settings.baseCurrency, favoriteKey].join('/');
        });
        const history = ApiService.getHistory(requiredCurrencySymbols);
        dispatch(setHistoryAction(history));
        dispatch(setLoadingStatusAction(false));
    };
}


//*******************************************
// EXPORT ACTION TYPE
//*******************************************
type FavoritesActions = IToggleFavoriteAction | ISetHistoryAction | ISetLoadingStatusAction;
export {FavoritesActions}
