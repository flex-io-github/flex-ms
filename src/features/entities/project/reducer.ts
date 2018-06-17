import { IProject } from "@src/service/models"
import { combineReducers } from "redux"

import * as reduxActions from "./actions"
import _ from "lodash"
import { getReturnOfExpression } from "utility-types"
import { getType } from "typesafe-actions"

const returnsOfAction = Object.values(reduxActions).map(getReturnOfExpression)

export type Action = typeof returnsOfAction[number]

export type ProjectState = {
    readonly list: {
        readonly entities: IProject[]
        readonly selectedEntity: any
        readonly isLoading: boolean
        readonly errorMessage: string
    }
    readonly record: any
}

export const projectReducer = combineReducers<ProjectState, Action>({
    list: (
        state = {
            entities: [],
            selectedEntity: {},
            isLoading: false,
            errorMessage: "",
        },
        action,
    ) => {
        switch (action.type) {
            case getType(reduxActions.fetchList):
                return {
                    ...state,
                    isLoading: true,
                }
            case getType(reduxActions.receivedList):
                return {
                    ...state,
                    isLoading: false,
                    entities: action.payload,
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
                    entities: [...state.entities, action.payload],
                }
            case getType(reduxActions.deleteRecord): {
                const recordToRemove: any = _.find(state.entities, entity => {
                    return entity.id === action.id
                })
                const index = state.entities.indexOf(recordToRemove)

                return {
                    ...state,
                    entities: [
                        ...state.entities.slice(0, index),
                        ...state.entities.slice(index + 1),
                    ],
                    isLoading: false,
                }
            }
            case getType(reduxActions.updateRecord): {
                const recordToRemove: any = _.find(state.entities, entity => {
                    return entity.id == action.payload.id
                })

                const stateIndex = state.entities.indexOf(recordToRemove)

                return {
                    ...state,
                    isLoading: false,
                    errorMessage: "",
                    entities: state.entities.map((item, index) => {
                        if (index !== stateIndex) {
                            return item
                        }
                        return {
                            ...item,
                            ...action.payload,
                        }
                    }),
                }
            }
            case getType(reduxActions.selectedList): {
                const selectedRecord: any = _.find(state.entities, entity => {
                    return entity.id == action.payload
                })

                return {
                    ...state,
                    selectedEntity: selectedRecord,
                }
            }
            default:
                return state
        }
    },
    record: (state = {}, action) => {
        switch (action.type) {
            case getType(reduxActions.recordInfo):
                return _.assign({}, state, action.payload)
            default:
                return state
        }
    },
})
