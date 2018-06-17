import { IClient } from "@src/service/models"
import { combineReducers } from "redux"

import * as reduxActions from "./actions"
import _ from "lodash"
import { getReturnOfExpression } from 'utility-types';
import { getType } from 'typesafe-actions';

const returnsOfAction = Object.values(reduxActions).map(
    getReturnOfExpression,
)

export type Action = typeof returnsOfAction[number]

export type ClientState = {
  readonly list: {
    readonly clients: IClient[]
    readonly isLoading: boolean
    readonly errorMessage: string
  }
  readonly record: any
}

export const clientReducer = combineReducers<ClientState, Action>({
    list: (
        state = {clients: [], isLoading: false, errorMessage: ""},
        action,
    ) => {
        switch (action.type){
            case getType(reduxActions.fetchList):
                return {
                    ...state,
                    isLoading: true,
                }
            case getType(reduxActions.receivedList):
                return {
                    ...state,
                    isLoading: false,
                    clients: action.payload,
                }
            case getType(reduxActions.saveRecord):
                return {
                    ...state,
                    isLoading: true,
                }
            case getType(reduxActions.saveRecordSuccess):
                return {
                    ...state,
                    isLoading: false,
                    clients: [...state.clients, action.payload]
                }
            case getType(reduxActions.deleteRecord):
                {
                    const recordToRemove: any = _.find(
                        state.clients,
                        client => {
                            return client.id === action.id
                        },

                    )
                    const index = state.clients.indexOf(recordToRemove)

                    return {
                        ...state,
                        clients: [
                            ...state.clients.slice(0, index),
                            ...state.clients.slice(index + 1),
                        ],
                        isLoading: false,
                    }
                }
                case getType(reduxActions.updateRecord):
                {
                    const clientToEdit: any = _.find(
                        state.clients,
                        client => {
                            return client.id === action.payload.id
                        },
                    )

                    const stateIndex = state.clients.indexOf(clientToEdit)

                    return {
                        isLoading: false,
                        errorMessage: "",
                        clients: state.clients.map((item, index) => {
                            if (index !== stateIndex){
                                return item
                            }
                            return {
                                ...item,
                                ...action.payload,
                            }
                        })
                    }
                }
            default:
                return state
        }
    },
    record: (state = {}, action) => {
        switch (action.type){
            case getType(reduxActions.recordInfo):
                return _.assign({}, state, action.payload)
            default:
                return state
        }
    }
})
