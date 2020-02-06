import {IListResponse, IProfileResponse, ILatestResponse, IHistoryResponse} from "./types/ApiServiceTypes";
import {ICurrencies, IPrices} from "../reducers/currency/types";
import {IFavorite, IHistoryPrice} from "../reducers/favorites/types";

class ApiService {
    private static readonly API_KEY = 'YQtS1fWSJTzeDo4obvRV8VluszaSzTXXDM61C7GoG2qgS2ttsD';
    private static readonly API_KEY_PARAM = 'access_key';
    private static readonly API_BASE = 'https://fcsapi.com/api/crypto/';

    private static _buildUrl(uri: string): URL {
        const url = new URL(uri, this.API_BASE);
        url.searchParams.append(this.API_KEY_PARAM, this.API_KEY);
        return url;
    }

    public static async getCurrencies(): Promise<ICurrencies> {
        const url = this._buildUrl('list');

        let symbolList: IListResponse;
        try {
            symbolList = await fetch(url.toString()).then(res => res.json()) as IListResponse;
        } catch (e) {
            throw new Error('Cannot fetch symbol list from url: ' + url.toString());
        }

        const symbolSet = new Set<string>();
        const availableTrades = {} as { [key: string]: string[] };

        symbolList.response.forEach(res => {
            const [fromCurrency, toCurrency] = res.symbol.split('/');
            symbolSet.add(fromCurrency);
            symbolSet.add(toCurrency);

            if (!availableTrades.hasOwnProperty(fromCurrency)) {
                availableTrades[fromCurrency] = [];
            }
            availableTrades[fromCurrency].push(toCurrency);
        });

        let currencies = await this.getCurrencyDetails([...symbolSet]);

        for (let [symbol, currency] of Object.entries(currencies)) {
            if (availableTrades.hasOwnProperty(symbol)) {
                currency.availableTrades = availableTrades[symbol].filter(tradeSymbol => currencies.hasOwnProperty(tradeSymbol));
            }
        }

        return currencies;
    }

    public static async getCurrencyDetails(symbols: string[]): Promise<ICurrencies> {
        const url = this._buildUrl('profile');
        url.searchParams.append('symbol', symbols.join(','));

        let response: IProfileResponse;
        try {
            response = await fetch(url.toString()).then(res => res.json()) as IProfileResponse;
        } catch (e) {
            throw new Error('Cannot fetch currency profiles from url: ' + url.toString());
        }

        const currencies = {} as ICurrencies;

        response.response.forEach(profile => {
            currencies[profile.short_name] = {
                shortName: profile.short_name,
                name: profile.name,
                type: profile.type as 'forex' | 'crypto',
                availableTrades: []
            };
        });

        return currencies;
    }

    public static async getPrices(symbols: string[]): Promise<IPrices> {
        const url = this._buildUrl('latest');
        url.searchParams.append('symbol', symbols.join(','));

        let response: ILatestResponse;
        try {
            response = await fetch(url.toString()).then(res => res.json()) as ILatestResponse;
        } catch (e) {
            throw new Error('Cannot fetch latest prices from url ' + url.toString());
        }
        const output = {} as IPrices;

        response.response.forEach(price => {
            const [from, to] = price.symbol.split('/');
            output[price.symbol] = {
                value: parseFloat(price.price),
                from, to
            };
        });

        return output;
    }

    public static async getHistory(symbols: string[], period: string = '1d'): Promise<any> {
        const requests = symbols.map(symbol => {
            const url = this._buildUrl('history');
            url.searchParams.append('symbol', symbol);
            url.searchParams.append('period', period);

            return fetch(url.toString()).then(res => res.json()) as Promise<IHistoryResponse>;
        });

        const responses = await Promise.all(requests);
        const output = {} as any;

        responses.forEach(response => {
            const symbol = response.info.symbol.split('/')[0];
            const history = response.response.map(candle => {
                return {
                    timestamp: candle.t,
                    value: parseFloat(candle.h),
                } as IHistoryPrice;
            });

            output[symbol] = {
                history,
                decimals: parseInt(response.info.decimal)
            }
        });
        return output;
    }
}

export default ApiService;
