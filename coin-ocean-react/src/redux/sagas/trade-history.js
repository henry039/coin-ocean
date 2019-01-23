import { put, take, call } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from './api';

export function* addTradeSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.ADD_DB_TRADE_HISTORY);
		try {
            const res = yield call(api.addTrade_api, payload.uid, payload.payload);
			yield put(actions.addTradeHistory(res));
		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* getTradeSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.GET_DB_TRADE_HISTORY);
		try {
            const res = yield call(api.getTrade_api, payload.uid);
			yield put(actions.getWallet(res));
		} catch(error) {
			yield put(actions.setError());
		}
	}
}