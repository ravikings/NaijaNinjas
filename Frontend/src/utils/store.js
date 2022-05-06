import { all, fork } from 'redux-saga/effects';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import authSagas from '../../src/markup/Pages/Auth/Redux/AuthSaga';

import authReducer from '../../src/markup/Pages/Auth/Redux/AuthReducer';

const rootReducer = combineReducers({
    authReducer: authReducer,
});

function* rootSaga() {
    yield all([
        // Home page
        yield all(authSagas.map((s) => fork(s))),
    ]);
}

function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
    return store;
}

export default configureStore;
