import { combineReducers } from "redux"
import { routerReducer as router, RouterState } from "react-router-redux"
import { RootAction } from "./root-action"
import { sessionReducer, SessionState } from "../features/session"
import { spinnerReducer } from "../features/spinner/reducer"
import { ClientState, clientReducer } from '../features/entities/client/reducer';
import { ProjectState, projectReducer } from '../features/entities/project/reducer';
import { TaskState, taskReducer } from '../features/entities/task/reducer';

interface StoreEnhancerState {}

interface Entities{
    client: ClientState
    project: ProjectState
    task: TaskState
}

export interface RootState extends StoreEnhancerState {
    router: RouterState
    session: SessionState
    spinner: boolean
    appState: Entities
}

const entitiesReducer = combineReducers<Entities, RootAction>({
    client: clientReducer,
    project: projectReducer,
    task: taskReducer,
})

export const rootReducer = combineReducers<RootState, RootAction>({
    router,
    session: sessionReducer,
    spinner: spinnerReducer,
    appState: entitiesReducer,
})
