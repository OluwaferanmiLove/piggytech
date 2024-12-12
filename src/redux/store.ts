import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import restaurantSlice from './profile/restaurant-slice';
import volatileSlice from './volatileStates/volatileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restaurantApi } from './profile/restaurant-api';

const reducers = combineReducers({
  volatileState: volatileSlice,
  restaurantSlice: restaurantSlice,
  [restaurantApi.reducerPath]: restaurantApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  // blacklist: ['volatileState'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(restaurantApi.middleware);

    return middlewares;
  },
});

const persistor = persistStore(store);

export {store, persistor};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
