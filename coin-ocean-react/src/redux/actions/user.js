import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const userLogin = createAction(actionType.USER_LOGIN, (uid, signInBool) => ({uid, signInBool}))

export const userLogout = createAction(actionType.USER_LOGOUT)