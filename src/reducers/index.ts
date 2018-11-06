import { combineReducers } from 'redux';

import hosts, { HostsState } from './hosts.reducer';

export interface ApplicationState {
  hosts: HostsState;
}

export default combineReducers({
  hosts,
});
