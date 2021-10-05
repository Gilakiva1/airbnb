import { userService } from "../services/user.service"

const initialState = {
    users: [],
    loggedInUser: userService.getLoggedinUser() || null
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

