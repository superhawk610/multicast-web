import produce from 'immer';
import {
  CHECK_HOST_VALIDITY_BEGIN,
  CHECK_HOST_VALIDITY_SUCCESS,
  CHECK_HOST_VALIDITY_ERROR,
  CLEAR_HOST_VALIDITY,
  CHECK_SANDBOX_BEGIN,
  CHECK_SANDBOX_SUCCESS,
  CHECK_SANDBOX_ERROR,
} from '../actions';

import { APIAction } from '../types';
import { IApplicationState } from './index';

interface IUtilAction {
  type: string;
  utilKey: string;
}

type UtilAPIAction = APIAction & IUtilAction;

export type UtilAction = IUtilAction | UtilAPIAction;

type UtilityResponse = any[] | { [x: string]: any } | null;

interface IUtility {
  loading: boolean;
  error: Error | null;
  response: UtilityResponse;
}

export interface IUtilsState {
  [utilKey: string]: IUtility;
}

const initialUtilityState: IUtility = {
  loading: false,
  error: null,
  response: null,
};

const initialState: IUtilsState = {};

const reducer = (state: IUtilsState = initialState, action: UtilAction) => {
  switch (action.type) {
    case CHECK_HOST_VALIDITY_BEGIN:
    case CHECK_SANDBOX_BEGIN: {
      const { utilKey } = action;

      return produce(state, draftState => {
        draftState[utilKey] = initialUtilityState;
        draftState[utilKey].loading = true;
        draftState[utilKey].error = null;
      });
    }

    case CHECK_HOST_VALIDITY_SUCCESS:
    case CHECK_SANDBOX_SUCCESS: {
      const {
        utilKey,
        api: { response },
      } = action as UtilAPIAction;

      return produce(state, draftState => {
        draftState[utilKey].loading = false;
        draftState[utilKey].response = response!;
      });
    }

    case CHECK_HOST_VALIDITY_ERROR:
    case CHECK_SANDBOX_ERROR: {
      const {
        utilKey,
        api: { error },
      } = action as UtilAPIAction;

      return produce(state, draftState => {
        draftState[utilKey].loading = false;
        draftState[utilKey].error = error!;
      });
    }

    case CLEAR_HOST_VALIDITY: {
      const { utilKey } = action;

      return produce(state, draftState => {
        draftState[utilKey] = { ...initialUtilityState };
      });
    }

    default:
      return state;
  }
};

//
//
// Selectors
export const getUtilLoading = (state: IApplicationState, utilKey: string) =>
  state.utils[utilKey].loading;
export const getUtilError = (state: IApplicationState, utilKey: string) =>
  state.utils[utilKey].error;
export const getUtilResponse = (
  state: IApplicationState,
  utilKey: string,
  defaultValue: any,
) => {
  const util = state.utils[utilKey] || {};

  return util.response || defaultValue;
};

export default reducer;
