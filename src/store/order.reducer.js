const initialState = {
    order: null
}


export function orderReducer(state = initialState, action) {
    var newstate;
    console.log('action',action.order);
    switch (action.type) {

        case 'SET_ORDER':
            newstate = { ...state, order: action.order }
            return { ...state, order: action.order }

        default: return { ...state }
    }

}

