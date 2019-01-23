import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const trade_history = handleActions({
    ADD_TRADE_HISTORY : (state, action) =>({
        ...state,
        trade_history : [
            ...state.trade_history,
            {
                date: new Date(),
                [`${action.payload.name}`] : [
                    action.payload.type,
                    action.payload.quantity,
                    action.payload.price,
                ],
            }
        ]
    })
}, initialState.trade_history)