import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from '../reducers/';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();
const initialState = {};
const enhancers = [];


  const middleWare = [
    thunk,
    routerMiddleware(history),
    logger()
  ];

  const composedEnhancers = compose(
    applyMiddleware(...middleWare),
    ...enhancers
  );
  const store = createStore(combineReducers, initialState, composedEnhancers);


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }


  export default store;
