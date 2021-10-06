import { userService } from "../services/user.service";
export function onAddUser(userDetails) {
    try {
        return async dispatch => {
            const user = await userService.signup(userDetails)
            dispatch({ type: 'ADD_USER', user })
            // return user
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}

export function onSetUser(userDetails) {
    try {
        return async dispatch => {
            const user = await userService.login(userDetails)
            dispatch({ type: 'SET_USER', user })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}