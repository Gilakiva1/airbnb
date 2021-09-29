import { orderService } from '../services/order.service'


export function onSetOrder(orderDetails) {
    try {
        return async dispath => {
            const order = await orderService.save(orderDetails)
            console.log('order',order);
            dispath({ type: 'SET_ORDER', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }

}

export function sendOrderDetails(order) {
    console.log('orderDetails', order);
    return async dispatch => {
        dispatch({ type: 'SET_ORDER', order })
    }
}