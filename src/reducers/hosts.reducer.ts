import produce from 'immer';
import { keyBy } from '../utils';
import {
  HOSTS_FETCH_BEGIN,
  HOSTS_FETCH_SUCCESS,
  HOSTS_FETCH_ERROR,
  REGISTER_HOST_BEGIN,
  REGISTER_HOST_SUCCESS,
  REGISTER_HOST_ERROR,
  DELETE_HOST_BEGIN,
  DELETE_HOST_SUCCESS,
  DELETE_HOST_ERROR,
} from '../actions';

import { APIAction, Status } from '../types';
import { IApplicationState } from './index';

export interface IHost {
  id: number;
  address: string;
  nickname: string;
  status: Status;
}

export interface IHostsState {
  loading: boolean;
  error: Error | null;
  modifyLoading: boolean;
  modifyError: Error | null;
  byId: { [id: string]: IHost };
}

const initialState: IHostsState = {
  loading: false,
  error: null,
  modifyLoading: false,
  modifyError: null,
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
    case REGISTER_HOST_BEGIN:
    case DELETE_HOST_BEGIN:
      return {
        ...state,
        modifyLoading: true,
        modifyError: null,
      };
    case HOSTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        byId: keyBy(action.api.response as IHost[], 'id'),
      };

    case REGISTER_HOST_SUCCESS: {
      const {
        api: { response },
      } = action;
      const { id } = response as IHost;

      return produce(state, draftState => {
        draftState.modifyLoading = false;
        draftState.byId[id] = response as IHost;
      });
    }

    case DELETE_HOST_SUCCESS: {
      const { id } = action;

      return produce(state, draftState => {
        draftState.modifyLoading = false;
        delete draftState.byId[id];
      });
    }

    case HOSTS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.api.error,
      };
    case REGISTER_HOST_ERROR:
    case DELETE_HOST_ERROR:
      return {
        ...state,
        modifyLoading: false,
        modifyError: action.api.error,
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
export const getHostById = (state: IApplicationState, id: number) =>
  state.hosts.byId[id];

export default reducer;
