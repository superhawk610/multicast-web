import { Action } from 'redux';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IAPI {
  path: string;
  method?: string;
  body?: {};
  response?: any[] | { [x: string]: any } | null;
  error?: Error | null;
}
interface IAPIAction {
  api: IAPI;
}

export type APIAction = IAPIAction & Action;

export interface IInputEvent {
  target: {
    name: string;
    value: string;
  };
}

export type Status = 'online' | 'offline' | 'searching';
