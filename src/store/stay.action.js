import { stayService } from '../services/stay.service';




export function loadStays() {
  return async (dispatch) => {
    try {
      const stays = await stayService.query();
      console.log('stats', stays);
      dispatch({ type: 'SET_STAYS', stays });
    } catch (err) {
      console.log(err, 'error is');
    }
  };
}
