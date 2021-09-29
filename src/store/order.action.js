import { orderService } from '../services/order.service'


export function onSetOrder(order) {
    try {
        return async dispath => {
            const savedOrder = await orderService.save(order)
            dispath({ type: 'SET_ORDER', savedOrder })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }

}