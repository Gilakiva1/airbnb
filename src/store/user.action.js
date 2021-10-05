
export function onAddUser(user) {
    try {
        return async dispatch => {
            dispatch({ type: 'ADD_USER', user })
            return user
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}

export function onSetUser(user) {
    try {
        return async dispatch => {
            dispatch({type: 'SET_USER', user})
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}