import { Action } from 'redux';
import { Omit, APIAction } from './types';
import { IHost } from './reducers/hosts.reducer';
import { UtilAction } from './reducers/utils.reducer';
import { IChannel } from './reducers/channels.reducer';
import { DialogAction, DialogResultAction } from './reducers/dialog.reducer';

// hosts
export const HOSTS_FETCH_BEGIN = 'HOSTS_FETCH_BEGIN';
export const HOSTS_FETCH_SUCCESS = 'HOSTS_FETCH_SUCCESS';
export const HOSTS_FETCH_ERROR = 'HOSTS_FETCH_ERROR';
export const REGISTER_HOST_BEGIN = 'REGISTER_HOST_BEGIN';
export const REGISTER_HOST_SUCCESS = 'REGISTER_HOST_SUCCESS';
export const REGISTER_HOST_ERROR = 'REGISTER_HOST_ERROR';
export const DELETE_HOST_BEGIN = 'DELETE_HOST_BEGIN';
export const DELETE_HOST_SUCCESS = 'DELETE_HOST_SUCCESS';
export const DELETE_HOST_ERROR = 'DELETE_HOST_ERROR';

// devices
export const DEVICES_FETCH_BEGIN = 'DEVICES_FETCH_BEGIN';
export const DEVICES_FETCH_SUCCESS = 'DEVICES_FETCH_SUCCESS';
export const DEVICES_FETCH_ERROR = 'DEVICES_FETCH_ERROR';

// channels
export const CHANNELS_FETCH_BEGIN = 'CHANNELS_FETCH_BEGIN';
export const CHANNELS_FETCH_SUCCESS = 'CHANNELS_FETCH_SUCCESS';
export const CHANNELS_FETCH_ERROR = 'CHANNELS_FETCH_ERROR';
export const CREATE_CHANNEL_BEGIN = 'CREATE_CHANNEL_BEGIN';
export const CREATE_CHANNEL_SUCCESS = 'CREATE_CHANNEL_SUCCESS';
export const CREATE_CHANNEL_ERROR = 'CREATE_CHANNEL_ERROR';

// utils
export const CHECK_HOST_VALIDITY_BEGIN = 'CHECK_HOST_VALIDITY_BEGIN';
export const CHECK_HOST_VALIDITY_SUCCESS = 'CHECK_HOST_VALIDITY_SUCCESS';
export const CHECK_HOST_VALIDITY_ERROR = 'CHECK_HOST_VALIDITY_ERROR';
export const CLEAR_HOST_VALIDITY = 'CLEAR_HOST_VALIDITY';
export const CHECK_SANDBOX_BEGIN = 'CHECK_SANDBOX_BEGIN';
export const CHECK_SANDBOX_SUCCESS = 'CHECK_SANDBOX_SUCCESS';
export const CHECK_SANDBOX_ERROR = 'CHECK_SANDBOX_ERROR';

// dialog
export const DIALOG_SHOW = 'DIALOG_SHOW';
export const DIALOG_HIDE = 'DIALOG_HIDE';

//
//
// hosts
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

export const deleteHost = (id: number): APIAction => ({
  type: DELETE_HOST_BEGIN,
  id,
  api: {
    method: 'delete',
    path: `hosts/${id}`,
  },
});

//
//
// devices
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

//
//
// channels
export const fetchChannels = (): APIAction => ({
  type: CHANNELS_FETCH_BEGIN,
  api: {
    path: 'channels',
  },
});

export const createChannel = (channel: Omit<IChannel, 'id'>): APIAction => ({
  type: CREATE_CHANNEL_BEGIN,
  api: {
    method: 'post',
    path: 'channels',
    body: channel,
  },
});

//
//
// utils
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

export const checkSandbox = (): UtilAction => ({
  type: CHECK_SANDBOX_BEGIN,
  utilKey: 'isSandbox',
  api: {
    path: 'utils/check-sandbox',
  },
});

//
//
// dialog
export const showDialog = (
  heading: string,
  message: string,
  onConfirmAction: DialogResultAction,
  onCancelAction?: DialogResultAction,
): DialogAction => ({
  type: DIALOG_SHOW,
  heading,
  message,
  onConfirmAction,
  onCancelAction,
});

export const hideDialog = (): Action => ({
  type: DIALOG_HIDE,
});
