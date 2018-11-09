import { keyBy } from '../utils';
import {
  DEVICES_FETCH_BEGIN,
  DEVICES_FETCH_SUCCESS,
  DEVICES_FETCH_ERROR,
} from '../actions';

import { APIAction, Status } from '../types';
import { IApplicationState } from './index';

export interface IDevice {
  id: number;
  hostId: number;
  channelId: number;
  identifier: string;
  nickname: string;
  status: Status;
}

export interface IDevicesState {
  loading: boolean;
  error: Error | null;
  byId: { [id: string]: IDevice };
}

const initialState: IDevicesState = {
  loading: false,
  error: null,
  byId: {},
};

const reducer = (state: IDevicesState = initialState, action: APIAction) => {
  switch (action.type) {
    case DEVICES_FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DEVICES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        byId: keyBy(action.api.response as IDevice[], 'id'),
      };
    case DEVICES_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.api.error,
      };
    default:
      return state;
  }
};

//
//
// Selectors
export const getDevices = (state: IApplicationState) =>
  Object.keys(state.devices.byId).map(id => state.devices.byId[id]);
export const getDevicesForHost = (state: IApplicationState, hostId: number) =>
  Object.keys(state.devices.byId)
    .filter(id => {
      const device = state.devices.byId[id];
      return device.hostId === hostId;
    })
    .map(id => state.devices.byId[id]);
export const getDeviceById = (state: IApplicationState, id: number) =>
  state.devices.byId[id];

export default reducer;
