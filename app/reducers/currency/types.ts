interface ICurrency {
    name: string,
    type: 'real' | 'crypto'
}

interface ICurrencyState {
    currencies: ICurrency[]
}

export {ICurrency, ICurrencyState}
