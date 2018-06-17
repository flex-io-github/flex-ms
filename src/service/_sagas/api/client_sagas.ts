import { clientActions } from "../../../features/entities/client"
import { getReturnOfExpression } from "utility-types"
import { getType } from "typesafe-actions"
import { IClient } from "@src/service/models"
import { call, put } from "redux-saga/effects"
import { DataSource } from "../../../service/dataSource"

const returnsOfActions = Object.values(clientActions).map(getReturnOfExpression)

export type Actions = typeof returnsOfActions[number]

export function* clientService(action: Actions): {} {
  if (action.type == getType(clientActions.fetchList)) {
    try {
      const resp: IClient[] = yield call(() =>
        DataSource.clients.getAll().then(list => {
          return list
        }),
      )
      yield put(clientActions.receivedList(resp))
    } catch (error) {
      console.log(`TODO: Error put in a reducer [${error}]`)
    }
  } else if (action.type == getType(clientActions.saveRecord)) {
    try {
      const resp: IClient = yield call(() =>
        DataSource.clients.add(action.payload).then(record => {
          return record
        }),
      )
      yield put(clientActions.saveRecordSuccess(resp))
    } catch (error) {
        console.log(`TODO: Error put in a reducer [${error}]`)
    }
  } else if (action.type == getType(clientActions.loadRecord)) {
    try {
      const resp: IClient = yield call(() =>
        DataSource.clients.get(action.payload).then(record => {
          return record
        }),
      )
      yield put(clientActions.recordInfo(resp))
    } catch (error) {
        console.log(`TODO: Error put in a reducer [${error}]`)
    }
  } else if (action.type == getType(clientActions.updateRecord)) {
    try {

      yield call(() => DataSource.clients.update(action.payload))

    } catch (error) {
        console.log(`TODO: Error put in a reducer [${error}]`)
    }
  } else if (action.type == getType(clientActions.deleteRecord)) {
    yield call(() => DataSource.clients.remove(action.id))
}

}
