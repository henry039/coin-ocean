import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const user = handleActions({
    USER_LOGIN : (state, action) =>({
        uid : action.payload.uid,
        isSignedIn : action.payload.signInBool,
        profile: action.payload.obj
    }),

    USER_LOGOUT : (state, action) => ({
        uid : null,
        isSignedIn : false,
        profile : {}
    })
}, initialState.user)