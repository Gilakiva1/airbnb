const initialState = {
    orders: [],
    currOrder: null
}


export function orderReducer(state = initialState, action) {

    switch (action.type) {

        case 'SET_ORDER':
            return { ...state, currOrder: action.order }
        case 'ADD_ORDER':
            return { ...state, orders: [...state.orders, action.order,] }
        case 'UPDATE_ORDER':
            return { ...state, currOrder: action.order }
<<<<<<< HEAD
        case 'LOAD_ORDERS':
            return { ...state, orders: action.orders }

=======
>>>>>>> bedf460c2f4585824eba2d5cf67754413c92b9c3
        default: return { ...state }
    }

}

