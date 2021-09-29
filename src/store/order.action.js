import { orderService } from '../services/order.service'
export function setOrder(order) {
    return async dispath => {
        const order = await orderService.setOrder(order)
        dispath({ type: 'SET_ORDER', order })

    }

}

export function sendOrderDetails(order) {
    console.log('orderDetails', order);
    return async dispatch => {
        dispatch({ type: 'SET_ORDER', order })
    }
}