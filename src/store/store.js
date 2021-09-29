import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { stayReducer } from './stay.reducer.js';
import { orderReducer } from './order.reducer.js';
import { userReducer } from './user.reducer.js';

const rootReducer = combineReducers({
  stayReducer,
  orderReducer,
//   userReducer,
});

// export const store = createStore(rootReducer, applyMiddleware(thunk))
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
// export const store = createStore(rootReducer, applyMiddleware(thunk))
