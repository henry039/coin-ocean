import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const createWallet = createAction(actionType.CREATE_WALLET, (uid, payload) => ({uid, payload}))

export const getWallet = createAction(actionType.GET_WALLET, (uid) => ({uid}))

export const updateWallet = createAction(actionType.UPDATE_WALLET, (uid, payload) => ({uid, payload}))