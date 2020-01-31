import {IListResponse, IProfileResponse} from "../types/FcApi";

class ApiService {
    private static readonly API_KEY = 'YQtS1fWSJTzeDo4obvRV8VluszaSzTXXDM61C7GoG2qgS2ttsD';
    private static readonly API_KEY_PARAM = 'access_key';
    private static readonly API_BASE = 'https://fcsapi.com/api/crypto/';

    public static buildUrl(uri: string): URL {
        const url = new URL(uri, this.API_BASE);
        url.searchParams.append(this.API_KEY_PARAM, this.API_KEY);
        return url;
    }

    public static async getProfileDetails(symbols: string[]) {
        const url = this.buildUrl('profile');
        url.searchParams.append('symbol', symbols.join(','));

        const response = await fetch(url.toString()).then(res => res.json()) as IProfileResponse;
        return response.response.map(profile => {
            return {
                short_name: profile.short_name,
                name: profile.name,
                icon: profile.icon,
                type: profile.type
            };
        });
    }

    public static async getSymbols() {
        const url = this.buildUrl('list');
        url.searchParams.append('type', 'forex');

        const response = await fetch(url.toString()).then(res => res.json()) as IListResponse;
        const output = {} as { [key: string]: any };

        response.response.forEach(symbolResponse => {
            const [baseCurrency, exchangeCurrency] = symbolResponse.symbol.split('/');

            if (!output.hasOwnProperty(baseCurrency)) {
                output[baseCurrency] = {
                    supportedCurrencies: []
                };
            }
            output[baseCurrency].supportedCurrencies.push(exchangeCurrency);
        });

        const profiles = await this.getProfileDetails(Object.keys(output));
        profiles.forEach(profile => {
            if(profile.short_name in output){
                Object.assign(output[profile.short_name], profile);
            }
        });

        return output;
    }
}

export default ApiService;
