import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const user = handleActions({
    USER_LOGIN : (state, action) =>({
        uid : action.payload.uid,
        isSignedIn : action.payload.signInBool
    }),

    USER_LOGOUT : (state, action) => ({
        uid : null,
        isSignedIn : false
    })
}, initialState.user)