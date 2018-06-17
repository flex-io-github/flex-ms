import { createAction } from "typesafe-actions"

import { LOGOUT, RECEIVE_ACCESS_TOKEN, LOGIN, RECEIVE_ERROR, LOGIN_SUCCESS, Session } from "./types"

export const logout = createAction(LOGOUT);

export const login = createAction(
  LOGIN,
  (username: string, password: string) => ({
    type: LOGIN,
    payload: {
      username: username,
      password: password,
    },
  }),
)

export const receiveError = createAction(RECEIVE_ERROR, (errorText: string) => ({
  type: RECEIVE_ERROR,
  payload: errorText
}))

export const loginSuccess = createAction(LOGIN_SUCCESS, (_Session: Session) => ({
    type: LOGIN_SUCCESS,
    payload: _Session
}),
)

// export const loginSuccess = createAction(LOGIN_SUCCESS, )