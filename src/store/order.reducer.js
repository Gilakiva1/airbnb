const initialState = {
    order: null
}


export function orderReducer(state = initialState, action) {
    var newstate;
    switch (action.type) {

        case 'SET_ORDER':
            return { ...state, order: action.order }

        default: return { ...state }
    }

}

