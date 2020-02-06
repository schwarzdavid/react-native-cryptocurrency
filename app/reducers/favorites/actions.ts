import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducer";
import ApiService from "../../services/ApiService";
import {IFavorite} from "./types";

//*******************************************
// TOGGLE FAVORITE ACTION
//*******************************************
const ADD_FAVORITE = 'ADD_FAVORITES';

interface IAddFavoriteAction extends Action<typeof ADD_FAVORITE> {
    symbol: string
}

function addFavoriteAction(symbol: string): IAddFavoriteAction {
    return {
        type: ADD_FAVORITE,
        symbol
    };
}

export {ADD_FAVORITE, IAddFavoriteAction, addFavoriteAction}


//*******************************************
// REMOVE FAVORITE ACTION
//*******************************************
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

interface IRemoveFavoriteAction extends Action<typeof REMOVE_FAVORITE> {
    symbol: string
}

function removeFavoriteAction(symbol: string): IRemoveFavoriteAction {
    return {
        type: REMOVE_FAVORITE,
        symbol
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
    history: { [key: string]: IFavorite }
}

function setHistoryAction(history: { [key: string]: IFavorite }): ISetHistoryAction {
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
type FavoritesActions = IAddFavoriteAction | ISetHistoryAction | ISetLoadingStatusAction;
export {FavoritesActions}
