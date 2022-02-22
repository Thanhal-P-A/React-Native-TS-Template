import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reducers from './reducers';

const AppReducers = combineReducers(Reducers);

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['UserReducer'],
  blacklist: ['GlobalReducer'],
  stateReconciler: hardSet,
};

const store = createStore(
  // @ts-ignore
  persistReducer(rootPersistConfig, AppReducers),
  compose(applyMiddleware(thunk, logger)),
);

const persistor = persistStore(store);

export {store, persistor};

export type TRootState = ReturnType<typeof AppReducers>;
export type TAppDispatch = typeof store.dispatch;
