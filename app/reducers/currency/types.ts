interface IPrice {
    price: number,
    from: string,
    to: string
}

interface ICurrency {
    name: string,
    shortName: string,
    icon: string,
    type: 'forex' | 'crypto'
}

interface ICurrencies {
    [key: string]: ICurrency
}

interface IPrices {
    [key: string]: IPrice
}

interface IAvailableTrades {
    [key: string]: string[]
}

interface ICurrencyState {
    currencies: ICurrencies,
    availableTrades: IAvailableTrades,
    prices: IPrices,
    isLoading: boolean
}

export {ICurrency, ICurrencyState, ICurrencies, IPrice, IPrices, IAvailableTrades}
