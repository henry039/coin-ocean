import { handleActions } from 'redux-actions';
import { initialState } from '../state';
import uuid from 'uuid';

// export const users = handleActions({
//     CREATE_USER : (state, action) => ({
//         ...state,
//         userList : [
//             ...state.userList,
//             {
//                 ...action.payload.user,
//                 order: state.userList.length + 1,
//                 id : uuid.v4(),
//             }
//         ]
//     })
// }, initialState.users)