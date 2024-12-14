// src/features/counterSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  showFilterTag: boolean;
  showExploreFilterTag: boolean;
  showMenu: boolean;
}

const initialState: CounterState = {
  value: 0,
  showFilterTag: false,
  showExploreFilterTag: false,
  showMenu: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    setShowFilterTag: (state, { payload }) => {
      state.showFilterTag = payload;
    },
    setShowExploreFilterTag: (state, { payload }) => {
      state.showFilterTag = payload;
    },
    setShowMenu: (state, { payload }) => {
      state.showMenu = payload;
    },
  },
});

export const {
  increment,
  setShowFilterTag,
  setShowExploreFilterTag,
  setShowMenu,
} = counterSlice.actions;

export default counterSlice.reducer;
