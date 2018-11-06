import {
  HOSTS_FETCH_BEGIN,
  HOSTS_FETCH_SUCCESS,
  HOSTS_FETCH_ERROR,
} from '../actions';

import { APIAction } from '../types';

export type Host = {
  address: string;
};
export interface HostsState {
  loading: boolean;
  error: Error | null;
  data: Array<Host>;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (state: HostsState = initialState, action: APIAction) => {
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
        data: action.api.response,
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

export default reducer;
