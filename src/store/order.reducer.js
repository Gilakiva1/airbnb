const initialState = {
    orders: [],
    currOrder: null
}


export function orderReducer(state = initialState, action) {

    switch (action.type) {

        case 'SET_ORDER':
            return { ...state, currOrder: action.order  }
        case 'ADD_ORDER':
            return { ...state, orders: [...state.orders, action.order,] }
        case 'UPDATE_ORDER':
            return { ...state, currOrder: action.updatedOrder }
        default: return { ...state }
    }

}

