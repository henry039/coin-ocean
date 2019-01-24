import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const user = handleActions({
    USER_STATUS : (state, action) =>({
        ...state,
        user : {
            uid : action.payload.uid,
            isSignedIn : action.payload.status
        }
    })
}, initialState.user)