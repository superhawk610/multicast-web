import { combineReducers } from 'redux';

import hosts, { IHostsState } from './hosts.reducer';
import devices, { IDevicesState } from './devices.reducer';
import utils, { IUtilsState } from './utils.reducer';

export interface IApplicationState {
  hosts: IHostsState;
  devices: IDevicesState;
  utils: IUtilsState;
}

export default combineReducers({
  hosts,
  devices,
  utils,
});
