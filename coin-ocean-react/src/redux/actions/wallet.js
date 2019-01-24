import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const createWallet = createAction(actionType.CREATE_WALLET, (res) => ({res}))

export const getWallet = createAction(actionType.GET_WALLET, (res) => ({res}))

export const updateWallet = createAction(actionType.UPDATE_WALLET, (res) => ({res}))

export const createWallet_DB = createAction(actionType.CREATE_DB_WALLET, (uid, body) => ({uid, body}))

export const getWallet_DB = createAction(actionType.GET_DB_WALLET, (uid) => ({uid}))

export const updateWallet_DB = createAction(actionType.UPDATE_DB_WALLET, (uid, body) => ({uid, body}))