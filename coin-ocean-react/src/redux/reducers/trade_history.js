import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const trade_history = handleActions({
    ADD_TRADE_HISTORY : (state, action) =>([
        // ...state,
        // {
        //     date: new Date(),
        //     [`${action.payload.body.name}`] : [
        //         action.payload.body.type,
        //         action.payload.body.quantity,
        //         action.payload.body.price,
        //     ],
        // }
        ...action.payload.res
    ]),

    GET_TRADE_HISTORY : (state, action) => ([
        ...action.payload.res
    ])
}, initialState.trade_history)