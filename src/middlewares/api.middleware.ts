import api from '../services/api.service';

import { Store } from 'redux';
import { APIAction } from '../types';

type APIMiddlewareNext = (a: APIAction) => void;

const middleware = (store: Store) => (next: APIMiddlewareNext) => (
  action: APIAction,
) => {
  if (!action.api) {
    return next(action);
  }

  next(action);

  const prefix = action.type.replace(/_BEGIN$/, '');
  api
    .handleRequest(action.api)
    .then(json => {
      next({
        ...action,
        type: `${prefix}_SUCCESS`,
        api: {
          ...action.api,
          response: json,
        },
      });
    })
    .catch(err => {
      next({
        ...action,
        type: `${prefix}_ERROR`,
        api: {
          ...action.api,
          error: err,
        },
      });
    });
};

export default middleware;
