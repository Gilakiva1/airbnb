import { de } from "date-fns/locale";
import { storageService } from "./async-storage.service"

export const orderService = {
    save,
    query
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
function query(filter) {
    return storageService.query(STORAGE_KEY, filter);
}
 


