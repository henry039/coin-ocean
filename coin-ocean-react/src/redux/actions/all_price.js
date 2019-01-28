import { actionType } from './actionType';
import { createAction } from 'redux-actions';

export const getPrice = createAction(actionType.GET_PRICE, (res)=>({res}))