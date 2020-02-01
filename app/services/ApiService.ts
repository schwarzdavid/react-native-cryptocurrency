import {IListResponse, IProfileResponse, ILatestResponse} from "./types/ApiServiceTypes";
import {ICurrency, ICurrencyDetail, IPrice} from "../reducers/currency/types";

class ApiService {
    private static readonly API_KEY = 'YQtS1fWSJTzeDo4obvRV8VluszaSzTXXDM61C7GoG2qgS2ttsD';
    private static readonly API_KEY_PARAM = 'access_key';
    private static readonly API_BASE = 'https://fcsapi.com/api/crypto/';

    public static buildUrl(uri: string): URL {
        const url = new URL(uri, this.API_BASE);
        url.searchParams.append(this.API_KEY_PARAM, this.API_KEY);
        return url;
    }

    public static async getProfileDetails(symbols: string[]): Promise<ICurrencyDetail[]> {
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

    public static async getSymbols(): Promise<{ [key: string]: ICurrency[] }> {
        const url = this.buildUrl('list');
        url.searchParams.append('type', 'forex');

        const response = await fetch(url.toString()).then(res => res.json()) as IListResponse;
        const output = {} as { [key: string]: any };

        response.response.forEach(symbolResponse => {
            const [baseCurrency, exchangeCurrency] = symbolResponse.symbol.split('/');

            if (!output.hasOwnProperty(baseCurrency)) {
                output[baseCurrency] = {
                    tradeCurrencies: {}
                };
            }
            output[baseCurrency].tradeCurrencies[exchangeCurrency] = null;
        });

        const profiles = await this.getProfileDetails(Object.keys(output));
        profiles.forEach(profile => {
            if (profile.shortName in output) {
                Object.assign(output[profile.shortName], profile) as ICurrency;
            }
        });

        return output;
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
}

export default ApiService;
