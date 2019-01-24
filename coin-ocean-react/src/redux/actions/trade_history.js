import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const getTradeHistory = createAction(actionType.GET_TRADE_HISTORY, (res) => ({res}))

export const addTradeHistory = createAction(actionType.ADD_TRADE_HISTORY, (res) => ({res}))

export const getTradeHistory_DB = createAction(actionType.GET_DB_TRADE_HISTORY, (uid) => ({uid}))

export const addTradeHistory_DB = createAction(actionType.ADD_DB_TRADE_HISTORY, (uid, body) => ({uid, body}))