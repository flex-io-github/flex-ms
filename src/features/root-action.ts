// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { $call } from 'utility-types';

import { sessionActions } from './session'
import { spinnerActions } from '@src/features/spinner';
import { clientActions } from '../features/entities/client';
import { projectActions } from '../features/entities/project';
import { taskActions } from '../features/entities/task';

export const actions = {
  sessions: sessionActions,
  spinner: spinnerActions,
  client: clientActions,
  project: projectActions,
  task: taskActions
};

const returnsOfActions = [
  ...Object.values(sessionActions),
  ...Object.values(spinnerActions),
  ...Object.values(clientActions),
  ...Object.values(projectActions),
  ...Object.values(taskActions),
].map($call);

type AppAction = typeof returnsOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
