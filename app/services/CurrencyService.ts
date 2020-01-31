import ApiService from "./ApiService";

interface MappedResult {

}

class CurrencyService extends ApiService {
    public static buildUrl(uri: string): URL {
        return super.buildUrl(this.FOREX_KEY + uri);
    }

    private static async _loadFromServer() {
        const url = this.buildUrl('latest/');
        return await fetch(url.toString()).then(res => res.json());
    }

    public static reloadAll() {
        return this._loadFromServer();
    }
}

export default CurrencyService;
