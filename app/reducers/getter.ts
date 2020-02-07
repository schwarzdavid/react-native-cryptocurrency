import {RootState} from "./reducer";
import {ICurrency} from "./currency/types";
import {IFavorite} from "./favorites/types";


//*******************************************
// PRICE DTO
//*******************************************

interface IPriceDTO {
    value: number,
    from: ICurrency,
    to: ICurrency,
    tradeSymbol: string,
    isFavorite: boolean
}

function getPrices(state: RootState): IPriceDTO[] {
    return Object.entries(state.currency.prices)
        .filter(([symbol, price]) => price.from === state.settings.baseCurrency)
        .map(([symbol, price]) => {
            return {
                value: price.value,
                from: state.currency.currencies[price.from],
                to: state.currency.currencies[price.to],
                tradeSymbol: symbol,
                isFavorite: state.favorites.favorites.hasOwnProperty(symbol)
            };
        });
}

export {getPrices, IPriceDTO}


//*******************************************
// FAVORITE DTO
//*******************************************

interface IFavoriteDTO extends IFavorite {
    from: ICurrency,
    to: ICurrency,
    tradeSymbol: string
}

function getFavorites(state: RootState): IFavoriteDTO[] {
    return Object.entries(state.favorites.favorites)
        .map(([symbol, favorite]) => {
            const [fromSymbol, toSymbol] = symbol.split('/');
            return {
                isLoading: favorite.isLoading,
                history: favorite.history,
                decimals: favorite.decimals,
                from: state.currency.currencies[fromSymbol],
                to: state.currency.currencies[toSymbol],
                tradeSymbol: symbol
            };
        });
}

export {IFavoriteDTO, getFavorites}
