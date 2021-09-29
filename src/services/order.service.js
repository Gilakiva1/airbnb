import { storageService } from "./async-storage.service"

export const orderService = {
    save,
    query
}
const STORAGE_KEY = 'orderDB'

function save(order) {
    console.log('save',order);
    if (order._id) {
        return storageService.put(STORAGE_KEY, order);
    } else {
        // order.owner = userService.getLoggedinUser();
        return storageService.post(STORAGE_KEY, order)
    }
}
function query() {
    return storageService.query(STORAGE_KEY);
}

function getOrderDetails() {
    return storageService.get(STORAGE_KEY);
  }

