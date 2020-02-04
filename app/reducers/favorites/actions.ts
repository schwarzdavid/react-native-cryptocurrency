import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducer";
import ApiService from "../../services/ApiService";
import {IHistoryState} from "./types";

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
// REMOVE FAVORITE ACTION
//*******************************************
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

interface IRemoveFavoriteAction extends Action<typeof REMOVE_FAVORITE> {
    key: string
}

function removeFavoriteAction(key: string): IRemoveFavoriteAction {
    return {
        type: REMOVE_FAVORITE,
        key
    };
}

export {REMOVE_FAVORITE, IRemoveFavoriteAction, removeFavoriteAction}


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
    history: { [key: string]: IHistoryState[] }
}

function setHistoryAction(history: { [key: string]: IHistoryState[] }): ISetHistoryAction {
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
            return [favoriteKey, state.settings.baseCurrency].join('/');
        });
        const history = await ApiService.getHistory(requiredCurrencySymbols);
        dispatch(setHistoryAction(history));
        dispatch(setLoadingStatusAction(false));
    };
}

export {reloadFavoritesData}


//*******************************************
// EXPORT ACTION TYPE
//*******************************************
type FavoritesActions = IToggleFavoriteAction | ISetHistoryAction | ISetLoadingStatusAction;
export {FavoritesActions}
