import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const userLogin = createAction(actionType.USER_LOGIN, (uid, profile) => ({uid, profile}))

export const userLogout = createAction(actionType.USER_LOGOUT)