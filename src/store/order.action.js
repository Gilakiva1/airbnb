import { orderService } from '../services/order.service'
import { stayService } from '../services/stay.service';


export function onAddOrder(orderDetails) {
    try {
        return async dispath => {
            const order = await orderService.save(orderDetails)
            dispath({ type: 'ADD_ORDER', order })
            return order
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}
export function onSetOrder(orderDetails) {
    try {
        return async dispath => {
            const order = await orderService.save(orderDetails)
            dispath({ type: 'SET_ORDER', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}
export function onLoadOrder(filter) {
    try {
        return async dispath => {
            const order = await orderService.query(filter)
            dispath({ type: 'SET_ORDER', order })
            return order
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}


// export function onLoadOrder() {
//     return async dispath => {
//         try {
//             const order = await orderService.query()
//             console.log('order', order);
//             dispath({ type: 'SET_ORDER', order })
//             return order
//         } catch (err) {
//             console.log('err', err);
//             throw err
//         }
//     }

// }
// export function onReserveOrder(stay, order) {
//     return async (dispatch) => {
//         try {
//             const stays = await stayService.placeOrder(stay, order);
//             dispatch({ type: 'SET_STAYS', stays });
//         } catch (err) {
//             console.log(err, 'error is');
//         }
//     };
// }



export function sendOrderDetails(order) {
    console.log('orderDetails', order);
    return async dispatch => {
        dispatch({ type: 'SET_ORDER', order })
    }
}