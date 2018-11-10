import produce from 'immer';
import { keyBy } from '../utils';
import {
  CHANNELS_FETCH_BEGIN,
  CHANNELS_FETCH_SUCCESS,
  CHANNELS_FETCH_ERROR,
  CREATE_CHANNEL_BEGIN,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_ERROR,
} from '../actions';

import { APIAction } from '../types';
import { IApplicationState } from './index';

export type ChannelLayout =
  | 'single'
  | '1-1-vertical'
  | '1-1-horizontal'
  | '1-2-vertical'
  | '1-2-horizontal'
  | '2-1-vertical'
  | '2-1-horizontal'
  | '2-1-1-vertical'
  | '2-1-1-horizontal'
  | '1-1-2-vertical'
  | '1-1-2-horizontal';

export interface IChannel {
  id: number;
  name: string;
  layout: string;
  duration: number;
  urls: string[];
}

export interface IChannelsState {
  loading: boolean;
  error: Error | null;
  modifyLoading: boolean;
  modifyError: Error | null;
  byId: { [id: string]: IChannel };
}

const initialState: IChannelsState = {
  loading: false,
  error: null,
  modifyLoading: false,
  modifyError: null,
  byId: {},
};

const reducer = (state: IChannelsState = initialState, action: APIAction) => {
  switch (action.type) {
    case CHANNELS_FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_CHANNEL_BEGIN:
      return {
        ...state,
        modifyLoading: true,
        modifyError: null,
      };
    case CHANNELS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        byId: keyBy(action.api.response as IChannel[], 'id'),
      };

    case CREATE_CHANNEL_SUCCESS: {
      const {
        api: { response },
      } = action;
      const { id } = response as IChannel;

      return produce(state, draftState => {
        draftState.modifyLoading = false;
        draftState.byId[id] = response as IChannel;
      });
    }

    case CHANNELS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.api.error,
      };
    case CREATE_CHANNEL_ERROR:
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
export const getChannels = (state: IApplicationState) =>
  Object.keys(state.channels.byId).map(id => state.channels.byId[id]);
export const getChannelById = (state: IApplicationState, id: number) =>
  state.channels.byId[id];

export default reducer;
