interface ICurrency {
    name: string,
    type: 'real' | 'crypto'
}

interface ICurrencyState {
    currencies: ICurrency[],
    lastUpdated?: number,
    isLoading: boolean,
    baseCurrency: string
}

export {ICurrency, ICurrencyState}
