import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const getCoinComments = createAction(actionType.GET_ALL_COMMENTS, (payload) => ({payload}))

export const getUserComments = createAction(actionType.GET_USER_COMMENTS, (uid, payload) => ({uid, payload}))

export const addComments = createAction(actionType.ADD_COMMENTS, (uid, payload) => ({uid, payload}))
