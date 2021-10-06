import { socketService } from "../services/socket.service";
import { userService } from "../services/user.service";
export function onAddUser(userDetails) {
    try {
        return async dispatch => {
            const user = await userService.signup(userDetails)
            socketService.emit('on-login', user._id)
            dispatch({ type: 'ADD_USER', user })
            // return user
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}

export function onSetMsg(msg) {

    return dispatch => {
        dispatch({ type: 'SET_MSG', msg })
        setTimeout(() => {
            dispatch({ type: 'SET_MSG', msg: null })
        }, 4000)
    }
}

export function onSetUser(userDetails) {
    try {
        return async dispatch => {
            const user = await userService.login(userDetails)
            socketService.emit('on-login', user._id)
            dispatch({ type: 'SET_USER', user })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}