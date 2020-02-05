import {ICurrencyTupel} from "../types";

interface IHistory {
    timestamp: number,
    value: number
}

interface IFavorite {
    history: IHistory[],
    decimals: number,
    currencies: ICurrencyTupel
}

interface IFavoritesState {
    favorites: IFavorite[],
    isLoading: boolean
}

export {IFavoritesState, IFavorite, IHistory}
