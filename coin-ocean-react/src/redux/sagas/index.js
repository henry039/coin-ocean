import { put, take, call, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';

import * as api from './api';

export function* getRolesSaga(uid) {
	while (true) {
		yield take(actions.actionType.CREATE_DB_WALLET);
		try {
            yield call(api.createWallet, uid);
			yield put(actions.createWallet(res));
		} catch(error) {
			yield put(actions.setError());
		}
	}
}