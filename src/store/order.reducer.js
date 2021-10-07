const initialState = {
    orders: [],
    currOrder: null
}

export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ORDER':
            return { ...state, currOrder: action.order }
        case 'ADD_ORDER':
            return { ...state, orders: [...state.orders, action.order] }
        case 'UPDATE_ORDER':
            return { ...state, currOrder: action.order }
        case 'LOAD_ORDERS':
            return { ...state, orders: action.orders }
        case 'UPDATE_STATUS_ORDER':{
            let orders = state.orders.map(order => (order._id === action.order._id)? action.order : order)
            return  { ...state, orders}
        }
        default: return { ...state }
    }
}

