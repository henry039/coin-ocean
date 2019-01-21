import { combineReducers } from 'redux';

// import { players } from './players';
import { selections } from './selections';

const appReducer = combineReducers({
	// players,
    selections
});

export const rootReducer = combineReducers({
	app: appReducer
});