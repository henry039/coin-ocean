import { put, take, call } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from './api';

export function* getAllCommentsSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.GET_DB_ALL_COMMENTS);
		try {
            const res = yield call(api.getAllComments_api, payload.coins);
			yield put(actions.getCoinComments(res));
		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* getUserCommentsSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.GET_DB_USER_COMMENTS);
		try {
            const res = yield call(api.getUserComments_api, payload.uid);
			yield put(actions.getUserComments(res));
		} catch(error) {
			yield put(actions.setError());
		}
	}
}

export function* addCommentSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.ADD_DB_COMMENTS);
		try {
            const res = yield call(api.addComments_api, payload.uid, payload.payload);
			yield put(actions.addComments(res));
		} catch(error) {
			yield put(actions.setError());
		}
	}
}
