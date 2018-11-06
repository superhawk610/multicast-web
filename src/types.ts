import { Action } from 'redux';

export type IAPI = {
  path: string;
  method?: string;
  response?: Array<any> | Object | null;
  error?: Error | null;
};
interface IAPIAction {
  api: IAPI;
}

export type APIAction = IAPIAction & Action;
