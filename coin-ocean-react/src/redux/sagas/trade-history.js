import { put, take, call } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from './api';

export function* addTradeSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.ADD_DB_TRADE_HISTORY);
		try {
			const {data} = yield call(api.addTrade_api, payload.uid, payload.body);
			yield put(actions.addTradeHistory(data.body));
		} catch(error) {
			yield put(actions.emitError(error.response));
		}
	}
}

export function* getTradeSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.GET_DB_TRADE_HISTORY);
		try {
			const {data} = yield call(api.getTrade_api, payload.uid);
			yield put(actions.getTradeHistory(data.body));
		} catch(error) {
			yield put(actions.emitError(error.response));
		}
	}
}