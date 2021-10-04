const initialState = {
    users: [],
    loggedInUser: null
}


export function userReducer(state = initialState, action) {

    switch (action.type) {

        case 'SET_USER':
            return { ...state, loggedInUser: action.user  }
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.user] }
        case 'UPDATE_USER':
            return { ...state, loggedInUser: action.user }
        default: return { ...state }
    }

}

