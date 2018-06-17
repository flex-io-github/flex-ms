import { taskActions } from "../../../features/entities/task"
import { getReturnOfExpression } from "utility-types"
import { getType } from "typesafe-actions"
import { ITask } from "@src/service/models"
import { call, put } from "redux-saga/effects"
import { DataSource } from "../../../service/dataSource"

const returnsOfActions = Object.values(taskActions).map(getReturnOfExpression)

export type Actions = typeof returnsOfActions[number]

export function* taskService(action: Actions): {} {
    if (action.type == getType(taskActions.fetchList)) {
        try {
            const resp: ITask[] = yield call(() =>
                DataSource.tasks.getAll().then(list => {
                    return list
                }),
            )
            yield put(taskActions.receivedList(resp))
        } catch (error) {
            console.log(`TODO: Error put in a reducer [${error}]`)
        }
    } else if (action.type == getType(taskActions.saveRecord)) {
        try {
            // console.log(action.payload)
            const resp: ITask = yield call(() =>
                DataSource.tasks.add(action.payload).then(record => {
                    return record
                }),
            )

            yield put(taskActions.saveRecordSuccess(resp))
        } catch (error) {
            console.log(`TODO: Error put in a reducer [${error}]`)
        }
    } else if (action.type == getType(taskActions.loadRecord)) {
        try {
            const resp: ITask = yield call(() =>
                DataSource.tasks.get(action.payload).then(record => {
                    return record
                }),
            )
            yield put(taskActions.recordInfo(resp))
        } catch (error) {
            console.log(`TODO: Error put in a reducer [${error}]`)
        }
    } else if (action.type == getType(taskActions.updateRecord)) {
        try {
            yield call(() => DataSource.tasks.update(action.payload))
        } catch (error) {
            console.log(`TODO: Error put in a reducer [${error}]`)
        }
    } else if (action.type == getType(taskActions.deleteRecord)) {
        yield call(() => DataSource.tasks.remove(action.id))
    }
}
