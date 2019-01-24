import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const userTracking = createAction(actionType.USER_STATUS, (uid, signInBool) => ({uid, signInBool}))