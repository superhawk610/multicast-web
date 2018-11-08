import { APIAction } from './types';

export const HOSTS_FETCH_BEGIN = 'HOSTS_FETCH_BEGIN';
export const HOSTS_FETCH_SUCCESS = 'HOSTS_FETCH_SUCCESS';
export const HOSTS_FETCH_ERROR = 'HOSTS_FETCH_ERROR';

export const DEVICES_FETCH_BEGIN = 'DEVICES_FETCH_BEGIN';
export const DEVICES_FETCH_SUCCESS = 'DEVICES_FETCH_SUCCESS';
export const DEVICES_FETCH_ERROR = 'DEVICES_FETCH_ERROR';

export const fetchHosts = (): APIAction => ({
  type: HOSTS_FETCH_BEGIN,
  api: {
    path: 'hosts',
  },
});

export const fetchDevices = (): APIAction => ({
  type: DEVICES_FETCH_BEGIN,
  api: {
    path: 'devices',
  },
});
