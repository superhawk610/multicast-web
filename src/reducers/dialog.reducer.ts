import { DIALOG_SHOW, DIALOG_HIDE } from '../actions';

import { Action } from 'redux';
import { APIAction } from '../types';
import { UtilAction } from './utils.reducer';

export type DialogResultAction = Action | APIAction | UtilAction;

interface IDialogAction {
  heading: string;
  message: string;
  onConfirmAction: DialogResultAction;
  onCancelAction: DialogResultAction | undefined;
}

export type DialogAction = Action & IDialogAction;

export interface IDialogState {
  active: boolean;
  heading: string;
  message: string;
  onConfirmAction: DialogResultAction | null;
  onCancelAction: DialogResultAction | null;
}

const initialState: IDialogState = {
  active: false,
  heading: '',
  message: '',
  onConfirmAction: null,
  onCancelAction: null,
};

const reducer = (state: IDialogState = initialState, action: DialogAction) => {
  switch (action.type) {
    case DIALOG_SHOW:
      return {
        ...state,
        active: true,
        heading: action.heading,
        message: action.message,
        onConfirmAction: action.onConfirmAction,
        onCancelAction: action.onCancelAction || null,
      };
    case DIALOG_HIDE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
