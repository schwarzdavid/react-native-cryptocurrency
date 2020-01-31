const RELOAD_ALL = 'CURRENCY_RELOAD_ALL';
interface ReloadAllAction {
    type: typeof RELOAD_ALL,
    payload?: any
}
function reloadAll(): ReloadAllAction {
    return {
        type: RELOAD_ALL
    };
}
export {RELOAD_ALL, ReloadAllAction, reloadAll}

const RELOAD_ONE = 'CURRENCY_RELOAD_ONE';
interface ReloadOneAction {
    type: typeof RELOAD_ONE,
    payload?: any
}
function reloadOne(id: number): ReloadOneAction {
    // TODO: DO ME
    return {
        type: RELOAD_ONE
    };
}


type CurrencyActionTypes = ReloadAllAction | ReloadOneAction;
export {CurrencyActionTypes}
