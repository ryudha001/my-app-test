import { combineReducers } from '@reduxjs/toolkit';
import type { Storage } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import {
  authActions,
  authReducer,
  authSlice,
  configActions,
  configReducer,
  configSlice,
  settingsActions,
  settingsReducer,
  settingsSlice,
} from './slices';
import { baseApi } from './services';

import { reduxStorage } from './storage';

interface PersistConfig {
  key: string;
  storage: Storage;
}

const persistConfig = (key: string, storage: Storage): PersistConfig => {
  const config: PersistConfig = {
    key,
    storage,
  };
  return config;
};

export const rootReducer = combineReducers({
  auth: persistReducer(
    persistConfig(authSlice.name, reduxStorage),
    authReducer,
  ),
  config: persistReducer(
    persistConfig(configSlice.name, reduxStorage),
    configReducer,
  ),
  settings: persistReducer(
    persistConfig(settingsSlice.name, reduxStorage),
    settingsReducer,
  ),
  // RTK Query reducers
  [baseApi.reducerPath]: baseApi.reducer,
});

export const apiMiddlewares = [baseApi.middleware];

export type RootReducer = ReturnType<typeof rootReducer>;

export const reset = (store: any): void => {
  store.dispatch(authActions.reset());
  store.dispatch(configActions.reset());
  store.dispatch(settingsActions.reset());
};
