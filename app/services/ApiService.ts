import {IListResponse, IProfileResponse, ILatestResponse, IHistoryResponse} from "./types/ApiServiceTypes";
import {ICurrencies, ICurrency, IPrice} from "../reducers/currency/types";
import {IFavorite, IHistory} from "../reducers/favorites/types";
import {ICurrencyTupel} from "../reducers/types";

class ApiService {
    private static readonly API_KEY = 'YQtS1fWSJTzeDo4obvRV8VluszaSzTXXDM61C7GoG2qgS2ttsD';
    private static readonly API_KEY_PARAM = 'access_key';
    private static readonly API_BASE = 'https://fcsapi.com/api/crypto/';

    public static buildUrl(uri: string): URL {
        const url = new URL(uri, this.API_BASE);
        url.searchParams.append(this.API_KEY_PARAM, this.API_KEY);
        return url;
    }

    public static async getCurrencyDetails(symbols: string[]): Promise<ICurrency[]> {
        const url = this.buildUrl('profile');
        url.searchParams.append('symbol', symbols.join(','));

        const response = await fetch(url.toString()).then(res => res.json()) as IProfileResponse;
        return response.response.map(profile => {
            return {
                shortName: profile.short_name,
                name: profile.name,
                icon: profile.icon,
                type: profile.type as 'forex' | 'crypto'
            };
        });
    }

    public static async getCurrenciesAndPrices(): Promise<{ currencies: ICurrencies, prices: IPrice[] }> {
        const url = this.buildUrl('list');

        const symbolList = await fetch(url.toString()).then(res => res.json()) as IListResponse;
        const symbolSet = new Set<string>();
        const priceSet = new Set<string>();

        symbolList.response.forEach(res => {
            const [fromCurrency, toCurrency] = res.symbol.split('/');
            symbolSet.add(fromCurrency);
            symbolSet.add(toCurrency);
            priceSet.add(fromCurrency + '/' + toCurrency);
            priceSet.add(toCurrency + '/' + fromCurrency);
        });

        const symbols = [...symbolSet];
        const currencies: ICurrencies = {};

        const currencyDetails = await this.getCurrencyDetails(symbols);
        currencyDetails.forEach(profile => {
            currencies[profile.shortName] = profile;
        });

        const remotePrices = symbolList.response.map(res => res.symbol);


        return {
            currencies,
            prices
        };
    }

    public static async getPrices(symbols: string[]): Promise<{ [key: string]: IPrice }> {
        const url = this.buildUrl('latest');
        url.searchParams.append('symbol', symbols.join(','));

        const response = await fetch(url.toString()).then(res => res.json()) as ILatestResponse;
        const output = {} as { [symbol: string]: IPrice };

        response.response.forEach(price => {
            const targetSymbol = price.symbol.split('/')[1];
            output[targetSymbol] = {
                price: parseFloat(price.price),
                lastChanged: price.last_changed
            };
        });

        return output;
    }

    public static async getHistory(symbols: string[], period: string = '1d'): Promise<{ [key: string]: IFavorite }> {
        const requests = symbols.map(symbol => {
            const url = this.buildUrl('history');
            url.searchParams.append('symbol', symbol);
            url.searchParams.append('period', period);

            console.log(url.toString());

            return fetch(url.toString()).then(res => res.json()) as Promise<IHistoryResponse>;
        });

        const responses = await Promise.all(requests);
        const output = {} as { [key: string]: IFavorite };

        responses.forEach(response => {
            const symbol = response.info.symbol.split('/')[0];
            const history = response.response.map(candle => {
                return {
                    timestamp: candle.t,
                    value: parseFloat(candle.h),
                } as IHistory;
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
