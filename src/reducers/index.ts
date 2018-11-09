import { combineReducers } from 'redux';

import hosts, { IHostsState } from './hosts.reducer';
import devices, { IDevicesState } from './devices.reducer';
import channels, { IChannelsState } from './channels.reducer';
import utils, { IUtilsState } from './utils.reducer';

export interface IApplicationState {
  hosts: IHostsState;
  devices: IDevicesState;
  channels: IChannelsState;
  utils: IUtilsState;
}

export default combineReducers({
  hosts,
  devices,
  channels,
  utils,
});
