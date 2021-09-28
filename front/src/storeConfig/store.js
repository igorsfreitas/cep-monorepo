import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {combineReducers} from 'redux';
import address from '../slices/addressSlice'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
	address
  });

const persistConfig = {
	key: 'root',
	version: 1,
	storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store);
export default store;