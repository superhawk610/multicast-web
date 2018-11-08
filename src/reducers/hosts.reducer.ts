import { keyBy } from '../utils';
import {
  HOSTS_FETCH_BEGIN,
  HOSTS_FETCH_SUCCESS,
  HOSTS_FETCH_ERROR,
} from '../actions';

import { APIAction } from '../types';
import { IApplicationState } from './index';

export interface IHost {
  id: number;
  address: string;
  nickname: string;
}
export interface IHostsState {
  loading: boolean;
  error: Error | null;
  byId: { [id: string]: IHost };
}

const initialState = {
  loading: false,
  error: null,
  byId: {},
};

const reducer = (state: IHostsState = initialState, action: APIAction) => {
  switch (action.type) {
    case HOSTS_FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case HOSTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        byId: keyBy(action.api.response as IHost[], 'id'),
      };
    case HOSTS_FETCH_ERROR:
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
export const getHosts = (state: IApplicationState) =>
  Object.keys(state.hosts.byId).map(id => state.hosts.byId[id]);
export const getHost = (state: IApplicationState, id: number) =>
  state.hosts.byId[id];

export default reducer;
