import { takeEvery, all, takeLatest } from "redux-saga/effects"
import { login } from "./session_sagas"

import * as clientActions from "../../features/entities/client/types"
import * as projectActions from "../../features/entities/project/types"
import * as taskActions from "../../features/entities/task/types"
import { $call } from "utility-types"
import { taskService, projectService, clientService } from "./api"
// import { bootstrap } from "./bootstrap_sagas"

export default function* root(): {} {
    yield all([
        takeEvery("@@session/LOGIN", login),
        takeEvery([...Object.values(clientActions)], clientService),
        takeEvery([...Object.values(projectActions)], projectService),
        takeEvery([...Object.values(taskActions)], taskService),
    ])
}
