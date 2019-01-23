// 'take' action type for DB
// 'fetch' api to DB
//     'call' api with axios post method
// 'put' return result to reducer with its 'action type'

import { call, put } from 'redux-saga/effects';

function* create(action) {
  try {
    // handle fetch side effects
    const code = yield call(axios.get, '/url/to/code?id=XXXXX');
    const order = {...some_object, code: code.data}

    // post req call
    const result = yield call(axios.post, '/url/to/order', order);

    // Better testing fetch 
    // const products = yield call(Api.fetch, '/products')
    const products = yield call(apiCall, {payload: 'hey'})

    // return into redux reducer to update store's state
    yield put({...action, type: CREATE_SUCCESS, data: result.data});
  } catch (e) {
    const errors = e.response.data;
    yield put({...action, type: CREATE_FAIL, errors: errors});
  }
}

const apiCall = (action) => {
    return axios.post('/posts', {
      payload: action.payload // only if not an object. Otherwise don't use outer {},
    },
   ).then(response => response.data)
    .catch(err => {
      throw err;
    });
  }