import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const wallet = handleActions({
    CREATE_WALLET : (state, action) => ({
        ...state,
        wallet : {
            ...state.wallet,
            rest : action.payload.rest
        }
    }),

    UPDATE_WALLET : (state, action) =>({
        ...state,
        wallet : {
            coins : {
                ...state.wallet.coins,
                [action.payload.coinsName] : action.payload.quantity
            },
            rest : action.payload.rest,
        }
    })
}, initialState.wallet)
