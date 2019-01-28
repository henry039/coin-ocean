import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const prices = handleActions({
    GET_PRICE : (state, action) =>({
        ...action.payload.res
    }),
}, initialState.prices)