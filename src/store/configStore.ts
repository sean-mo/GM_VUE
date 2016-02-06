'use strict';
declare var module: any;
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import thunkMiddleware = require('redux-thunk');
import createLogger  = require('redux-logger');
import rootReducers from '../reducer/rootReducers';
import * as actionsALL from '../actions/rootActions';

const createStoreWithMiddleware: any = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore);

function configureStore(): Redux.Store {
  const store: Redux.Store = createStoreWithMiddleware(combineReducers(rootReducers), {});
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducer/rootReducers', () => {
      const nextRootReducer: Redux.Reducer = require('../reducer/rootReducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
let configStore: any  = configureStore();
let acts: any = Object.keys(actionsALL).reduce((prev: any, key: any) => {
    let curr: any = actionsALL[key];
    prev[key] = curr.bindTo ? curr.bindTo(configStore) : bindActionCreators(curr, configStore.dispatch);
    return prev;
}, {})

export const store: any = configStore;
export const Actions: any = acts;

