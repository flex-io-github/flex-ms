export const LOGOUT = "@@session/LOGOUT"
export const RECEIVE_ACCESS_TOKEN = "@@session/RECEIVE_ACCESS_TOKEN"
export const LOGIN = "@@session/LOGIN"
export const RECEIVE_ERROR = "@@session/RECEIVE_ERROR"
export const LOGIN_SUCCESS = '@@session/LOGIN_SUCCESS'

export type IUser = {
  username: string
  password: string
}


export interface Session {
  readonly accessToken: string
  readonly loggedIn: boolean
  readonly userId: string | number | any
}

export interface Error {
  readonly errorText: string
}
