import { combineReducers } from 'redux';
import { wallet } from './wallet';
import { trade_history } from './trade_history';
import { comments } from './comments';
import { user } from './user';
import { error } from './error'
import { prices } from './all_price'

export const rootReducer = combineReducers({
	wallet,
	trade_history,
	comments,
	user,
	error,
	prices
});
