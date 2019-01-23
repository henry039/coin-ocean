import { combineReducers } from 'redux';
import {wallet} from './wallet';
import { trade_history } from './trade_history';
import {comments } from './comments';

export const rootReducer = combineReducers({
	wallet,
	trade_history,
	comments
});
