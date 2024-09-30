// src/store.ts

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import playerReducer from '../features/player/playerSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    episode: playerReducer,
  },
});

export default store;
