import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const error = handleActions({
    EMIT_ERROR : (state, action) =>({
        ...state,
        error : {
            isError : true,
            error_msg : action.payload.error
        }
    })
}, initialState.error)