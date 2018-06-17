import { combineReducers } from "redux"
import { getType } from "typesafe-actions"
import { $call } from "utility-types"

import * as actions from "./actions"
import { loginSuccess, logout, receiveError } from "./actions"
const returnsOfActions = Object.values(actions).map($call)
export type SessionAction = typeof returnsOfActions[number]
import { Session, Error } from "./types"
import { deleteAccessToken } from '../../util/access_token_utils';

export interface SessionState {
  readonly session: Session
  readonly error: Error
}


const initialState: Session = {
  loggedIn: false,
  accessToken: "",
  userId: null
}

const removeSession = (state: Session): Session => {
  deleteAccessToken();
  return ({
    accessToken: "",
    loggedIn: false,
    userId: null
  })
}

export const sessionReducer = combineReducers<SessionState, SessionAction>({
  session: (state: Session = initialState, action) => {
    switch (action.type) {
      case getType(loginSuccess):
        return {
          userId: action.payload.userId,
          accessToken: action.payload.accessToken,
          loggedIn: true,
        }
      case getType(logout):
        return removeSession(state)
      default:
        return state
    }
  },
  error: (state: Error = { errorText: "" }, action) => {
    switch (action.type) {
      case getType(receiveError):
        return { errorText: action.payload }
      default:
        return state
    }
  }
})
