import { storageService } from './async-storage.service';
import { userService } from './user.service';
// import { utilService } from './util.service';
export const stayService = {
  query,
  getById,
  save,
  remove,
};

const STORAGE_KEY = 'stayDB';

function query(filterBy={}) {
  const filter = {...filterBy}
  return storageService.query(STORAGE_KEY,filter);
}

function getById(stayId) {
  return storageService.getById(stayId);
}

function remove(stayId) {
  return storageService.remove(stayId);
}

function save(stay) {
  if (stay._id) {
    return storageService.put(STORAGE_KEY, stay);
  } else {
    stay.owner = userService.getLoggedinUser();
    return storageService.post(STORAGE_KEY, stay);
  }
}
