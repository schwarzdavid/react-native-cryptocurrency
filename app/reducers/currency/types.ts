import {ICurrencyTupel} from "../types";

interface IPrice {
    currencies: ICurrencyTupel
    price?: number,
    decimals: number
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

interface ICurrencyState {
    currencies: ICurrencies,
    availablePrices: any[]
    prices: IPrice[]
    lastUpdated: number | null,
    isLoading: boolean
}

export {ICurrency, ICurrencyState, ICurrencies, IPrice}
