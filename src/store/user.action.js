
export function onAddUser(user) {
    try {
        return async dispatch => {
            dispatch({ type: 'SET_USER', user })
            return user
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}