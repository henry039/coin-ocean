import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const getTradeHistory = createAction(actionType.GET_TRADE_HISTORY, (uid) => ({uid}))

export const addTradeHistory = createAction(actionType.ADD_TRADE_HISTORY, (uid, payload) => ({uid, payload}))