import { createAction } from "typesafe-actions"

import { SET_SPINNER } from './types'

export const setSpinner = createAction(
    SET_SPINNER,
    (visible: boolean) => ({
        type: SET_SPINNER,
        payload: visible
    })
)