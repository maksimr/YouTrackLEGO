const AppDb = db('App');
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './reducers';
import {db, read} from './db';

export const store = createStore(AppReducer, read(AppDb), applyMiddleware(thunk));
