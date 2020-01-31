interface ICurrency {
    name: string,
    type: 'real' | 'crypto'
}

interface ICurrencyState {
    currencies: ICurrency[],
    lastUpdated?: number
}

export {ICurrency, ICurrencyState}
