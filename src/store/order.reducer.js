const initialState = {
    orders: [],

}


export function orderReducer(state = initialState, action) {

    switch (action.type) {
       
        case 'ADD_ORDER':
            return { ...state, orders: [...state.orders, action.order,] }
        case 'UPDATE_ORDER':
            return { ...state, orders: action.updatedOrder }

        default: return { ...state }
    }

}

