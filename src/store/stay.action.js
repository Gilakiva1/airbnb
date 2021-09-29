import { stayService } from '../services/stay.service';

export function loadStays(params) {
  console.log('loadStays');
  return async (dispatch) => {
    try {
      const stays = await stayService.query(params);
      dispatch({ type: 'SET_STAYS', stays });
    } catch (err) {
      console.log(err, 'error is');
    }
  };
}


export function onSetFilter(filterBy) {
  
  return dispatch => {
    dispatch({ type: 'FILTER_STAYS', filterBy })
  }
}
