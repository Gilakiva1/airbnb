const initialState = {
  stays: [],
};

export function stayReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STAYS':
      return { ...state, stays: action.stays };
    default:
      return { ...state };
  }
}    
