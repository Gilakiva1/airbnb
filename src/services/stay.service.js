import { storageService } from './async-storage.service';
import { userService } from './user.service';
// import { utilService } from './util.service';
export const stayService = {
  query,
  getById,
  save,
  remove,
  placeOrder
};

const STORAGE_KEY = 'stayDB';

function query(params) {
 
  return storageService.query(STORAGE_KEY, params);
}

async function getById(stayId) {
  const stay = await storageService.get(STORAGE_KEY, stayId);
  return stay
}   

function remove(stayId) {
  return storageService.remove(stayId);
}

function save(stay) {
  if (stay._id) {
    return storageService.put(STORAGE_KEY, stay);
  } else {
    // stay.owner = userService.getLoggedinUser();
    return storageService.post(STORAGE_KEY, stay);
  }
}
function placeOrder(stay, order) {
  
  
  return storageService.put(STORAGE_KEY, stay, order)

}
