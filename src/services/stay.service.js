import { storageService } from './async-storage.service';
import { userService } from './user.service';
import { httpService } from './http.service';
import { utilService } from './util.service';
export const stayService = {
  query,
  getById,
  save,
  remove,
  placeOrder
};

const STORAGE_KEY = 'stayDB';

function query(filterBy={}) {

  const queryString = (!filterBy) ? '' : '?' + utilService.makeQueryParams(filterBy)
  return httpService.get(`stay${queryString}`)
}

async function getById(stayId) {
  try {
    return httpService.get(`stay/${stayId}`)
  } catch (err) {
    throw err
  }
}

function remove(stayId) {
  return storageService.remove(stayId);
}

function save(stay) {
  if (stay._id) {
    return storageService.put(STORAGE_KEY, stay);
  } else {
    return storageService.post(STORAGE_KEY, stay);
  }
}
function placeOrder(stay, order) {


  return storageService.put(STORAGE_KEY, stay, order)

}
