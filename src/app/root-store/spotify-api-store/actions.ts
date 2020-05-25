import { Action } from '@ngrx/store';

export enum ActionTypes {
  LOGIN_SUCCESS = '[Spotify API] Login Success'
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { accessToken: string }) {}
}

export type Actions = LoginSuccessAction;
