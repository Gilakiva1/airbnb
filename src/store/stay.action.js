import { stayService } from '../services/stay.service';

export function loadStays(params) {
  return async (dispatch) => {
    try {
      const stays = await stayService.query(params);
      dispatch({ type: 'SET_STAYS', stays });
    } catch (err) {
      console.log(err, 'error is');
    }
  };
}

export function sendOrderDetails (orderDetails){
  console.log(orderDetails);
  return dispatch => {
    dispatch({ type: 'SET_ORDER', orderDetails })
  }
}

export function onSetFilter(filterBy) {
  
  return dispatch => {
    dispatch({ type: 'FILTER_STAYS', filterBy })
  }
}
