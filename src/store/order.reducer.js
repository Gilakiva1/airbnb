const initialState = {
    order: null
}


export function orderReducer(state = initialState, action) {
    var newstate;
    switch (action.type) {

        

        case 'SET_ORDER':
            newstate = { ...state, order: action.order }
            console.log('newstate', newstate);
            return { order: action.order }

        default: return { ...state }


    }

}

