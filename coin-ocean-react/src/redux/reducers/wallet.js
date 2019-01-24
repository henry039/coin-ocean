import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const wallet = handleActions({
    CREATE_WALLET : (state, action) => ({
        ...state,
        rest : action.payload.res
    }),

    UPDATE_WALLET : (state, action) =>({
        ...state,
        coins : action.payload.res.coins,
        rest : action.payload.res.rest,
    }),

    GET_WALLET : (state, action) => ({
        coins : action.payload.res.coins,
        rest : action.payload.res.rest,
        dailyPL : action.payload.res.dailyPL
    })
}, initialState.wallet)
