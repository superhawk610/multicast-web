import { Action } from 'redux';
import { APIError } from './middlewares/api.middleware';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type APIResponse = any[] | { [x: string]: any } | null;

export interface IAPI {
  path: string;
  method?: string;
  body?: {};
  response?: APIResponse;
  error?: APIError | Error | null;
}
interface IAPIAction {
  api: IAPI;
  [x: string]: any; // for passing additional params, such as `id`
}

export type APIAction = IAPIAction & Action;

export interface IInputEvent {
  target: {
    name: string;
    value: string;
  };
}

export type Status = 'online' | 'offline' | 'searching';
