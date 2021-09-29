import { orderService } from '../services/order.service'
export function setOrder(order) {
    return async dispath => {
        await orderService.setOrder(order)
        dispath({ type: 'SET_ORDER', order })

    }

}