import { APIAction } from './types';

export const HOSTS_FETCH_BEGIN = 'HOSTS_FETCH_BEGIN';
export const HOSTS_FETCH_SUCCESS = 'HOSTS_FETCH_SUCCESS';
export const HOSTS_FETCH_ERROR = 'HOSTS_FETCH_ERROR';

export const fetchHosts = (): APIAction => ({
  type: HOSTS_FETCH_BEGIN,
  api: {
    path: 'hosts',
  },
});
