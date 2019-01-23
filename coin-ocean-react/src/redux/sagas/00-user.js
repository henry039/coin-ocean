import { put, take, call, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';

import * as api from '../util/data';

export function* getRolesSaga(uid) {
	while (true) {

		yield take(actions.actionType.CREATE_GAME);

		try {
			const data = yield call(api.getRolesData, uid);

			const roles = data.Items.reduce((collection, role) => {
				collection[role.id] = role;
				return collection;
			}, {});

			yield put(actions.setRoles(roles));

		} catch(error) {
			yield put(actions.setError());
		}
	}
}