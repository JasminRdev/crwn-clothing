import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from './root-reducer';
import {rootSaga} from './root-saga'

const sagaMiddleware = createSagaMiddleware();

// [2 === 3 && {a:"String"}].filter(Boolean) 
// Ergebnis: []
// [2 === 2 && {a:"String"}].filter(Boolean) 
// Ergebnis: [{a:"String"}]
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga)