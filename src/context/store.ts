// src/store.ts

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import playerReducer from '../features/player/playerSlice';
import modelReducer from '..//features/login/ModelSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    episode: playerReducer,
    model : modelReducer
  },
});

export default store;
