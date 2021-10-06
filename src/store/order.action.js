import { orderService } from '../services/order.service'
import { stayService } from '../services/stay.service';


export function onLoadOrders(filterBy) {
    try {
        return async dispatch => {
            const orders = await orderService.query(filterBy)
            dispatch({ type: 'LOAD_ORDERS', orders })
            return orders
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }

}
export function onAddOrder(orderDetails) {
    try {
        return async dispatch => {
            const order = await orderService.save(orderDetails)
            dispatch({ type: 'SET_ORDERS', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}
export function onUpdateOrder(order) {
    try {
        return async dispatch => {
            dispatch({ type: 'UPDATE_ORDER', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }

}

export function onSetOrder(order) {
    try {
        return async dispatch => {
            dispatch({ type: 'SET_ORDER', order })
        }
    } catch (err) {
        console.log('err', err);
        throw err
    }
}




// export function onLoadOrder() {
//     return async dispatch => {
//         try {
//             const order = await orderService.query()
//             console.log('order', order);
//             dispatch({ type: 'SET_ORDER', order })
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



// export function sendOrderDetails(order) {
//     console.log('orderDetails', order);
//     return async dispatch => {
//         dispatch({ type: 'SET_ORDER', order })
//     }
// }