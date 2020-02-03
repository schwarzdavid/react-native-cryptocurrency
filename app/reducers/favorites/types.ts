interface IFavoriteCurrency {

}

interface IFavoritesState {
    favorites: {
        [key: string]: IFavoriteCurrency
    },
    isLoading: boolean
}

export {IFavoritesState, IFavoriteCurrency}
