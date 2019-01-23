import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { initialState } from './state'

//Create saga middleware (keeps API logic in one place)
const sagaMiddleware = createSagaMiddleware(rootSaga);

//Combine saga middleware and redux devtools
const createStoreWithMiddleware = compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())(createStore);

//Create redux store (holds the state tree of the app)
const store = createStoreWithMiddleware(rootReducer, initialState);

export default store;