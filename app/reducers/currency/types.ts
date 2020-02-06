interface IPrice {
    value: number,
    from: string,
    to: string
}

interface ICurrency {
    name: string,
    shortName: string,
    type: 'forex' | 'crypto',
    availableTrades: string[]
}

interface ICurrencies {
    [key: string]: ICurrency
}

interface IPrices {
    [key: string]: IPrice
}

interface ICurrencyState {
    currencies: ICurrencies,
    prices: IPrices,
    isLoading: boolean
}

export {ICurrency, ICurrencyState, ICurrencies, IPrice, IPrices}
