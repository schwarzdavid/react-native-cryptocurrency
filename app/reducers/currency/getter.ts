import {RootState} from "../reducer";
import {IPrice} from "./types";

// TODO: create priceDTO
function getCurrentPrices(state: RootState): IPrice[] {
    return Object.values(state.currency.prices).filter(price => price.from === state.settings.baseCurrency);
}

export {getCurrentPrices}
