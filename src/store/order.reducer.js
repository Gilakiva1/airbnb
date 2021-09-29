const initialState = {
    order: null
}


export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDER':
           console.log('action.order',action.order);
            return { ...state, order: action.order }
        default: return { ...state }
    }

}

