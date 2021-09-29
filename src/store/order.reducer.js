const initialState = {
    order: null
}


export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDER':
           
            return { ...state, order: action.order }
            
        default: return { ...state }


    }

}

