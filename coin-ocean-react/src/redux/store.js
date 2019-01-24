import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import rootSaga from './sagas';
import { initialState } from './state'

//Create saga middleware (keeps API logic in one place)
const sagaMiddleware = createSagaMiddleware();

//Combine saga middleware and redux devtools
//Create redux store (holds the state tree of the app)
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga)
export default store;