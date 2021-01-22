import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import reducers from './ducks';
import sagas from './sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: seamlessImmutableReconciler,
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

const middlewares = [];

// const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware();

// middlewares.push(sagaMiddleware);

const composer = compose(applyMiddleware(...middlewares, sagaMiddleware));

const store = createStore(persistedReducer, composer);
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
