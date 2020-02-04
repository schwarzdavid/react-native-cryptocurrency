interface IHistoryState {
    timestamp: number,
    value: number
}

interface IHistory {
    history: IHistoryState[],
    decimals: number
}

interface IFavoritesState {
    favorites: {
        [key: string]: IHistory
    },
    isLoading: boolean
}

export {IFavoritesState, IHistory, IHistoryState}
