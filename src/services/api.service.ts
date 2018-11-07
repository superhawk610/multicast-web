import { IAPI } from '../types';

const API_ROOT = 'http://localhost:8080';

const withApi = (path: string) => `${API_ROOT}/${path}`;

const api = {
  get: (path: string) => fetch(withApi(path)).then(res => res.json()),
  post: (path: string, body: {} = {}) =>
    fetch(withApi(path), {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => res.json()),
  patch: (path: string, body: {} = {}) =>
    fetch(withApi(path), {
      method: 'patch',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => res.json()),
  handleRequest: ({ path, body, method = 'get' }: IAPI) => {
    switch (method) {
      case 'get':
        return api.get(path);
      case 'post':
        return api.post(path, body);
      case 'patch':
        return api.patch(path, body);
      default:
        return Promise.reject(new Error(`Unrecognized HTTP method ${method}`));
    }
  },
};

export default api;
