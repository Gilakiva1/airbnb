import { storageService } from "./async-storage.service"

export const orderService = {
    save
}
const STORAGE_KEY = 'orderDB'

function save(order) {
    if (order._id) {
        return storageService.put(STORAGE_KEY, order);
    } else {
        // order.owner = userService.getLoggedinUser();
        return storageService.post(STORAGE_KEY, order)
    }
}

function getOrderDetails() {
    return storageService.get(STORAGE_KEY);
  }

