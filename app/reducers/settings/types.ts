interface ICurrency {
    name: string,
    short_name: string,
    icon: string,
    type: 'forex' | 'crypto'
}

interface ISettingsState {
    baseCurrency: string,
    currencies: ICurrency[]
    lastUpdated?: number
}

export {ISettingsState}
