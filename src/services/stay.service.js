import { userService } from './user.service';
import { httpService } from './http.service';
import { utilService } from './util.service';
export const stayService = {
  query,
  getById,

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
