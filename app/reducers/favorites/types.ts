interface IHistoryState {
    timestamp: number,
    value: number
}

interface IFavoritesState {
    favorites: {
        [key: string]: IHistoryState[]
    },
    isLoading: boolean
}

export {IFavoritesState, IHistoryState}
