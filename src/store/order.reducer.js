const initialState = {
    order: null
}


export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDER':
            console.log('initialState',initialState.order);
            return { ...state, order: action.order }
            
        default: return { ...state }


    }

}

