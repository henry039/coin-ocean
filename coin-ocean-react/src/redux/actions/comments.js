import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const getCoinComments = createAction(actionType.GET_ALL_COMMENTS, (res) => ({res}))

export const getUserComments = createAction(actionType.GET_USER_COMMENTS, (res) => ({res}))

export const addComments = createAction(actionType.ADD_COMMENTS, (res) => ({ res}))

export const getCoinComments_DB = createAction(actionType.GET_DB_ALL_COMMENTS, (body) => ({body}))

export const getUserComments_DB = createAction(actionType.GET_DB_USER_COMMENTS, (uid) => ({uid}))

export const addComments_DB = createAction(actionType.ADD_DB_COMMENTS, (uid, body) => ({uid, body}))