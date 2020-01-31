class ApiService {
    private static readonly API_KEY = 'YQtS1fWSJTzeDo4obvRV8VluszaSzTXXDM61C7GoG2qgS2ttsD';
    private static readonly API_KEY_PARAM = 'access_key';
    private static readonly API_BASE = 'https://fcsapi.com/api/';

    protected static readonly FOREX_KEY = 'forex/';
    protected static readonly CRYPTO_KEY = 'crypto/';

    public static buildUrl(uri: string): URL {
        const url = new URL(uri, this.API_BASE);
        url.searchParams.set(this.API_KEY_PARAM, this.API_KEY);
        return url;
    }
}

export default ApiService;
