const initialState = {
  stays: [],

};

export function stayReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STAYS':
      return { ...state, stays: action.stays };
    case 'FILTER_STAYS':

      if (action.filterBy.price) {
        const { minPrice } = action.filterBy.price
        const { maxPrice } = action.filterBy.price

        return {
          ...state, stays: state.stays.filter(stay => {
            return stay.price >= minPrice && stay.price <= maxPrice
          })
        }
      }

    default:
      return { ...state };
  }
}
