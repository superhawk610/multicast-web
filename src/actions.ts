import { Action } from 'redux';
import { Omit, APIAction } from './types';
import { IHost } from './reducers/hosts.reducer';
import { UtilAction } from './reducers/utils.reducer';

export const HOSTS_FETCH_BEGIN = 'HOSTS_FETCH_BEGIN';
export const HOSTS_FETCH_SUCCESS = 'HOSTS_FETCH_SUCCESS';
export const HOSTS_FETCH_ERROR = 'HOSTS_FETCH_ERROR';
export const REGISTER_HOST_BEGIN = 'REGISTER_HOST_BEGIN';
export const REGISTER_HOST_SUCCESS = 'REGISTER_HOST_SUCCESS';
export const REGISTER_HOST_ERROR = 'REGISTER_HOST_ERROR';

export const DEVICES_FETCH_BEGIN = 'DEVICES_FETCH_BEGIN';
export const DEVICES_FETCH_SUCCESS = 'DEVICES_FETCH_SUCCESS';
export const DEVICES_FETCH_ERROR = 'DEVICES_FETCH_ERROR';

export const CHECK_HOST_VALIDITY_BEGIN = 'CHECK_HOST_VALIDITY_BEGIN';
export const CHECK_HOST_VALIDITY_SUCCESS = 'CHECK_HOST_VALIDITY_SUCCESS';
export const CHECK_HOST_VALIDITY_ERROR = 'CHECK_HOST_VALIDITY_ERROR';
export const CLEAR_HOST_VALIDITY = 'CLEAR_HOST_VALIDITY';

export const fetchHosts = (): APIAction => ({
  type: HOSTS_FETCH_BEGIN,
  api: {
    path: 'hosts',
  },
});

export const registerHost = (
  host: Omit<IHost, 'id' | 'status'>,
): APIAction => ({
  type: REGISTER_HOST_BEGIN,
  api: {
    method: 'post',
    path: 'hosts',
    body: host,
  },
});

export const fetchDevices = (): APIAction => ({
  type: DEVICES_FETCH_BEGIN,
  api: {
    path: 'devices',
  },
});

export const fetchDevicesForHost = (id: number): APIAction => ({
  type: DEVICES_FETCH_BEGIN,
  api: {
    path: `devices?host=${id}`,
  },
});

export const checkHostValidity = (address: string): UtilAction => ({
  type: CHECK_HOST_VALIDITY_BEGIN,
  utilKey: 'hostIsValid',
  api: {
    path: `utils/check-host-validity?address=${encodeURIComponent(address)}`,
  },
});

export const clearHostValidity = (): UtilAction => ({
  type: CLEAR_HOST_VALIDITY,
  utilKey: 'hostIsValid',
});
