import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducer";
import ApiService from "../../services/ApiService";
import {IHistories} from "./types";

//*******************************************
// TOGGLE FAVORITE ACTION
//*******************************************
const CREATE_FAVORITE = 'CREATE_FAVORITE';

interface ICreateFavoriteAction extends Action<typeof CREATE_FAVORITE> {
    symbol: string
}

function createFavoriteAction(symbol: string): ICreateFavoriteAction {
    return {
        type: CREATE_FAVORITE,
        symbol
    };
}

export {CREATE_FAVORITE, ICreateFavoriteAction, createFavoriteAction}


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
const SET_LOADING_STATUS = 'SET_FAVORITE_LOADING_STATUS';

interface ISetLoadingStatusAction extends Action<typeof SET_LOADING_STATUS> {
    status: boolean,
    symbol: string
}

function setLoadingStatusAction(symbol: string, status: boolean): ISetLoadingStatusAction {
    return {
        type: SET_LOADING_STATUS,
        symbol, status
    };
}

export {SET_LOADING_STATUS, ISetLoadingStatusAction, setLoadingStatusAction}


//*******************************************
// SET HISTORY DATA
//*******************************************
const SET_HISTORY = 'SET_HISTORY';

interface ISetHistoryAction extends Action<typeof SET_HISTORY> {
    history: IHistories
}

function setHistoryAction(history: IHistories): ISetHistoryAction {
    return {
        type: SET_HISTORY,
        history
    };
}

export {SET_HISTORY, ISetHistoryAction, setHistoryAction}


//*******************************************
// ADD FAVORITE
//*******************************************

function addFavoriteAction(symbol: string): ThunkAction<Promise<void>, RootState, {}, Action> {
    return async (dispatch) => {
        dispatch(createFavoriteAction(symbol));
        dispatch(setLoadingStatusAction(symbol, true));
        const history = await ApiService.getHistory([symbol]);
        dispatch(setHistoryAction(history));
        dispatch(setLoadingStatusAction(symbol, false));
    };
}

export {addFavoriteAction}


//*******************************************
// RELOAD FAVORITES
//*******************************************

function reloadFavoritesAction(): ThunkAction<Promise<void>, RootState, {}, Action> {
    return async (dispatch, getState) => {
        const requiredSymbols = Object.entries(getState().favorites.favorites)
            .filter(([, favorite]) => !favorite.isLoading)
            .map(([symbol]) => symbol);

        requiredSymbols.forEach(symbol => {
            dispatch(setLoadingStatusAction(symbol, true));
        });

        const history = await ApiService.getHistory(requiredSymbols);
        dispatch(setHistoryAction(history));

        requiredSymbols.forEach(symbol => {
            dispatch(setLoadingStatusAction(symbol, false));
        });
    };
}

export {reloadFavoritesAction}


//*******************************************
// EXPORT ACTION TYPE
//*******************************************
type FavoritesActions = ICreateFavoriteAction | ISetHistoryAction | ISetLoadingStatusAction | IRemoveFavoriteAction;
export {FavoritesActions}
