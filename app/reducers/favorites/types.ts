interface IHistoryPrice {
    timestamp: number,
    value: number
}

interface IHistory {
    history: IHistoryPrice[],
    decimals: number
}

interface IHistories {
    [key: string]: IHistory
}

interface IFavorite extends IHistory{
    isLoading: boolean
}

interface IFavorites {
    [key: string]: IFavorite
}

interface IFavoritesState {
    favorites: IFavorites
}

export {IFavoritesState, IFavorite, IHistory, IHistoryPrice, IHistories}
