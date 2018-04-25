import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/devTools';

const defaultState = {};

const configureStore = (preloadedState = defaultState) => createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
  ),
);

export default configureStore;
