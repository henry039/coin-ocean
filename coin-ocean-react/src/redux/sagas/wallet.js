import { put, take, call } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from './api';

export function* createWalletSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.CREATE_DB_WALLET);
		try {
			const {data} = yield call(api.createWallet_api, payload.uid, payload.body);
			yield put(actions.createWallet(data[0].rest));
		} catch(error) {
			yield put(actions.emitError(error.response));
		}
	}
}

export function* getWalletSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.GET_DB_WALLET);
		try {
			const {data} = yield call(api.getWallet_api, payload.uid);
			yield put(actions.getWallet(data));
		} catch(error) {
			yield put(actions.emitError(error.response));
		}
	}
}

export function* updateWalletSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.UPDATE_DB_WALLET);
		try {
			const {data} = yield call(api.updateWallet_api, payload.uid, payload.body);
			yield put(actions.updateWallet(data));
		} catch(error) {
			yield put(actions.emitError(error.response));
		}
	}
}