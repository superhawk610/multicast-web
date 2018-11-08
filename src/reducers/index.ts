import { combineReducers } from 'redux';

import hosts, { IHostsState } from './hosts.reducer';
import devices, { IDevicesState } from './devices.reducer';

export interface IApplicationState {
  hosts: IHostsState;
  devices: IDevicesState;
}

export default combineReducers({
  hosts,
  devices,
});
