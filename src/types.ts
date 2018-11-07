import { Action } from 'redux';

export interface IAPI {
  path: string;
  method?: string;
  body?: {};
  response?: any[] | {} | null;
  error?: Error | null;
}
interface IAPIAction {
  api: IAPI;
}

export type APIAction = IAPIAction & Action;
