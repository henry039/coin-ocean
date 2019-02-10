import { put, take, call } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from './api';

export function* getAllCommentsSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.GET_DB_ALL_COMMENTS);
		try {
			const {data} = yield call(api.getAllComments_api, payload.body);
			yield put(actions.getCoinComments(data.body));
		} catch(error) {
			yield put(actions.emitError(error.response));
		}
	}
}

export function* getUserCommentsSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.GET_DB_USER_COMMENTS);
		try {
            const {data} = yield call(api.getUserComments_api, payload.uid);
			yield put(actions.getUserComments(data.body));
		} catch(error) {
			yield put(actions.emitError(error.response));
		}
	}
}

export function* addCommentSaga() {
	while (true) {
		const {payload} = yield take(actions.actionType.ADD_DB_COMMENTS);
		try {
			const {data} = yield call(api.addComments_api, payload.uid, payload.body);
			console.log(data)
			yield put(actions.addComments(data.body));
		} catch(error) {
			yield put(actions.emitError(error.response));
		}
	}
}
