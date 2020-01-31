const ADD = 'FAVORITES_ADD';
interface AddAction {
    type: typeof ADD,
    payload?: any
}
function add(id: number): AddAction {
    return {
        type: ADD
    };
}
export {ADD, AddAction, add}

type FavoritesActions = AddAction;
export {FavoritesActions}
