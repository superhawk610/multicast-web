import { combineReducers } from 'redux';

import hosts, { IHostsState } from './hosts.reducer';

export interface IApplicationState {
  hosts: IHostsState;
}

export default combineReducers({
  hosts,
});
