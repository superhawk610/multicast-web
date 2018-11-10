import api from '../services/api.service';

import { Store } from 'redux';
import { APIResponse, APIAction } from '../types';

export const ECONNREFUSED = 'ECONNREFUSED';
export const ENOTFOUND = 'ENOTFOUND';
export const UnknownError = 'UnknownError';

type APIErrorCode = 'ECONNREFUSED' | 'ENOTFOUND' | 'UnknownError';

export class APIError extends Error {
  public code: APIErrorCode | null;

  public constructor(message: string, code: APIErrorCode | null = null) {
    super(`APIError: ${message}`);
    this.code = code;

    // NOTE: Due to some questionable decisions by the TypeScript team,
    // extending `Error` breaks `instanceOf` by default, the prototype
    // must be set manually, and doesn't work on IE 10 or earlier (but
    // honestly, what does). See the links below for the related issue
    // and rationale.
    // tslint:disable-next-line:max-line-length
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // https://github.com/Microsoft/TypeScript/issues/13965
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

const apiErrorForResponse = (response: APIResponse): APIError | null => {
  if (!response || Array.isArray(response) || !response.error) return null;
  let code: APIErrorCode;
  let message: string;
  switch (true) {
    case response.error.includes(ECONNREFUSED):
      code = ECONNREFUSED;
      message = 'Connection refused.';
      break;
    case response.error.includes(ENOTFOUND):
      code = ENOTFOUND;
      message = 'Host not found.';
      break;
    default:
      code = UnknownError;
      message = response.error;
  }
  return new APIError(message, code);
};

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
        type: `${prefix}_${json.error ? 'ERROR' : 'SUCCESS'}`,
        api: {
          ...action.api,
          response: json,
          error: apiErrorForResponse(json),
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
