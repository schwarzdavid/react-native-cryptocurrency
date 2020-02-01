interface ICurrencyDetail {
    name: string,
    shortName: string,
    icon: string,
    type: 'forex' | 'crypto'
}

interface IPrice {
    price: number,
    lastChanged: string
}

interface ICurrency extends ICurrencyDetail {
    tradeCurrencies: {
        [key: string]: IPrice | null
    }
}

interface ICurrencyState {
    currencies: {
        [key: string]: ICurrency
    },
    lastUpdated: number | null,
    isLoading: boolean
}

export {ICurrency, ICurrencyState, ICurrencyDetail, IPrice}
