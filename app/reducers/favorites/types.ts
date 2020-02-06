interface IHistoryPrice {
    timestamp: number,
    value: number
}

interface IFavorite {
    history: IHistoryPrice[],
    decimals: number
}

interface IFavorites {
    [key: string]: IFavorite
}

interface IFavoritesState {
    favorites: IFavorites,
    isLoading: boolean
}

export {IFavoritesState, IFavorite, IHistoryPrice}
