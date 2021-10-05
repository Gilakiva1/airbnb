import { storageService } from "./async-storage.service"
import { httpService } from "./http.service";
export const orderService = {
    save,
    query
}
const STORAGE_KEY = 'orderDB'

function save(order) {
    if (order._id) {
        return httpService.put('order', order);
    } else {
        // order.owner = userService.getLoggedinUser();
        return httpService.post('order', order)
    }
}
function query(filter) {
    return httpService.get(`order${filter}`);
}



