import { combineReducers } from "redux"
import * as spinnerActions from "./actions"
import { getType, getReturnOfExpression } from "typesafe-actions"

const returnsOfAction = Object.values(spinnerActions).map(getReturnOfExpression)
export type Action = typeof returnsOfAction[number]


export function spinnerReducer(state: boolean = false, action: Action ): boolean {
    switch (action.type) {
        case getType(spinnerActions.setSpinner):
            return action.payload
    default:
        return state
    }
}