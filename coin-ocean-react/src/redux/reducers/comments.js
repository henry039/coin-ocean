import { handleActions } from 'redux-actions';
import { initialState } from '../state';

export const comments = handleActions({
    ADD_COMMENTS : (state, action) =>([
        ...action.payload.res
    ]),

    GET_USER_COMMENTS : (state, action) =>([
        ...action.payload.res
    ]),

    GET_ALL_COMMENTS : (state, action) =>([
        ...action.payload.res
    ]),
}, initialState.comments)
