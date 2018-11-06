import { IAPI } from '../types';

const API_ROOT = 'http://localhost:8080';

const withApi = (path: string) => `${API_ROOT}/${path}`;

const api = {
  get: (path: string) => fetch(withApi(path)).then(res => res.json()),
  handleRequest: ({ path, method = 'get' }: IAPI) => {
    switch (method) {
      case 'get':
        return api.get(path);
      default:
        return Promise.reject(new Error(`Unrecognized HTTP method ${method}`));
    }
  },
};

export default api;
