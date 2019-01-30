import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const user = handleActions({
    USER_LOGIN : (state, action) =>({
        uid : action.payload.uid,
        profile: action.payload.profile
    }),

    USER_LOGOUT : (state, action) => ({
        uid : null,
        profile : {}
    })
}, initialState.user)