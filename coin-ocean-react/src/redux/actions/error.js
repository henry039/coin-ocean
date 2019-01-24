import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const emitError = createAction(actionType.EMIT_ERROR, (err) => ({err}))