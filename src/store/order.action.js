import { orderService } from '../services/order.service'


export function onSetOrder(orderDetails) {
    try {
        console.log('orderDetails',orderDetails);
        return async dispath => {
            const order = await orderService.save(orderDetails)
           
            dispath({ type: 'SET_ORDER', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }

}
export function onLoadOrder() {
    try {
        return async dispath => {
            const order = await orderService.query()
            dispath({ type: 'SET_ORDER', order: order[0] })
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