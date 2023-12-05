import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import dateReducer from './dateReducer';
import filtersReducer from './filtersReducer';
import holidaysReducer from './holidaysReducer';
import { localStorageMiddleware } from './localStorageMiddleware';
import todosReducer from './todosReducer';

const reducers = combineReducers({
  holidays: holidaysReducer,
  todos: todosReducer,
  date: dateReducer,
  filters: filtersReducer,
});

const store: Store<RootState> = createStore(reducers, applyMiddleware(localStorageMiddleware));

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export default store;
