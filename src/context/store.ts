// src/store.ts


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import playerReducer from "../features/player/playerSlice";
import { searchApi } from "../pages/search/services/searchApi";
import HistorySlice from "../pages/search/slice/HistorySlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FavoriteSlice from "../pages/search/slice/FavoriteSlice";

import modelReducer from '..//features/login/ModelSlice';


// Define persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["history","favorite"], // Reducers you want to persist
};

// Combine all reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  episode: playerReducer,
  model : modelReducer,
  history: HistorySlice,
  favorite: FavoriteSlice,
  [searchApi.reducerPath]: searchApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({

  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(searchApi.middleware),

});

export const persistor = persistStore(store);

export default store;
