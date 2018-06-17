import { projectActions } from "../../../features/entities/project"
import { getReturnOfExpression } from "utility-types"
import { getType } from "typesafe-actions"
import { IProject } from "@src/service/models"
import { call, put } from "redux-saga/effects"
import { DataSource } from "../../../service/dataSource"

const returnsOfActions = Object.values(projectActions).map(getReturnOfExpression)

export type Actions = typeof returnsOfActions[number]

export function* projectService(action: Actions): {} {
    if (action.type == getType(projectActions.fetchList)) {
        try {
            const resp: IProject[] = yield call(() =>
                DataSource.projects.getAll().then(list => {
                    return list
                }),
            )
            yield put(projectActions.receivedList(resp))
        } catch (error) {
            console.log(`TODO: Error put in a reducer [${error}]`)
        }
    } else if (action.type == getType(projectActions.saveRecord)) {
        try {
            // console.log(action.payload)
            const resp: IProject = yield call(() =>
                DataSource.projects.add(action.payload).then(record => {
                    return record
                }),
            )

            yield put(projectActions.saveRecordSuccess(resp))
        } catch (error) {
            console.log(`TODO: Error put in a reducer [${error}]`)
        }
    } else if (action.type == getType(projectActions.loadRecord)) {
        try {
            const resp: IProject = yield call(() =>
                DataSource.projects.get(action.payload).then(record => {
                    return record
                }),
            )
            yield put(projectActions.recordInfo(resp))
        } catch (error) {
            console.log(`TODO: Error put in a reducer [${error}]`)
        }
    } else if (action.type == getType(projectActions.updateRecord)) {
        try {
            yield call(() => DataSource.projects.update(action.payload))
        } catch (error) {
            console.log(`TODO: Error put in a reducer [${error}]`)
        }
    } else if (action.type == getType(projectActions.deleteRecord)) {
        yield call(() => DataSource.projects.remove(action.id))
    }
}
