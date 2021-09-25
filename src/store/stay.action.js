import { stayService } from '../services/stay.service';

export function loadStays() {
  return async (dispatch) => {
    try {
      const stays = await stayService.query();
      dispatch({ type: 'SET_STAYS', stays });
    } catch (err) {
      console.log(err, 'error is');
    }
  };
}


export function onSetFilter(filterBy) {
  return (dispatch) => {
    stayService.query(filterBy)
          .then(stays => {
              dispatch({
                  type: 'SET_STAYS',
                  stays
              })
          })
  }
}
