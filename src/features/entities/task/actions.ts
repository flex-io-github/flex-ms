import * as actions from "./types"
import { createAction } from "typesafe-actions"
import { ITask } from "@src/service/models"

export const fetchList = createAction(actions.FETCH_LIST)

export const deleteRecord = createAction(
  actions.DELETE_RECORD,
  (id: string) => ({ type: actions.DELETE_RECORD, id }),
)

export const saveRecord = createAction(
  actions.SAVE_RECORD,
  (entity: ITask) => ({
    type: actions.SAVE_RECORD,
    payload: entity,
  }),
)

export const saveRecordSuccess = createAction(
    actions.SAVE_RECORD_SUCCESS,
    (entity: ITask) => ({
        type: actions.SAVE_RECORD_SUCCESS,
        payload: entity,
    })
)

export const receivedList = createAction(
    actions.RECEIVED_LIST,
    (entities: ITask[]) => ({
        type: actions.RECEIVED_LIST,
        payload: entities,
    })
)

export const updateRecord = createAction(
    actions.UPDATE_RECORD,
    (entity: ITask) => ({
        type: actions.UPDATE_RECORD,
        payload: entity,
    })
)

export const recordInfo = createAction(
    actions.RECORD_INFO,
    (entity: ITask) => ({
        type: actions.RECORD_INFO,
        payload: entity
    })
)

export const loadRecord = createAction(
    actions.LOAD_RECORD,
    (id: string) => ({
      type: actions.LOAD_RECORD,
      payload: id,
    }),
  )

export const selectedList = createAction(
    actions.SELECTED_LIST,
    (id: any) => ({
        type: actions.SELECTED_LIST,
        payload: id,
    })
)