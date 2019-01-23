import { put, take, call } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from './api';

export function* createWalletSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.CREATE_DB_WALLET);
		try {
            const res = yield call(api.createWallet_api, payload.uid);
			yield put(actions.createWallet(res));
		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* getWalletSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.GET_DB_WALLET);
		try {
            const res = yield call(api.getWallet_api, payload.uid);
			yield put(actions.getWallet(res));
		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* updateWalletSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.UPDATE_DB_WALLET);
		try {
            const res = yield call(api.updateWallet_api, payload.uid, payload.payload);
			yield put(actions.updateWallet(res));
		} catch(error) {
			yield put(actions.setError());
		}
	}
}