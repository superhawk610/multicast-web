import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import apiMiddleware from './middlewares/api.middleware';

import rootReducer from './reducers';

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(apiMiddleware, logger),
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
