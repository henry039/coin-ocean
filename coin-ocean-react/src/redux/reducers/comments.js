import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const comments = handleActions({
    ADD_COMMENTS : (state, action) =>({
        ...state,
        comment : [
            ...state.comment,
            {
                date: new Date(),
                context : action.payload.context,
                tag : action.payload.tag
            }
        ]
    })
}, initialState.comments)
