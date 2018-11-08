import { applyMiddleware, createStore, compose } from 'redux';

import logger from 'redux-logger';
import apiMiddleware from './middlewares/api.middleware';

import rootReducer from './reducers';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(apiMiddleware, logger)),
  );

  if ((module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
