import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'

import { rootReducer } from './root-reducer';

// [2 === 3 && {a:"String"}].filter(Boolean) 
// Ergebnis: []
// [2 === 2 && {a:"String"}].filter(Boolean) 
// Ergebnis: [{a:"String"}]
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
