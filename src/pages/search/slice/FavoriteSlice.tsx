// src/features/navbar/navbarSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteItem {
  id: string;
  vod_id?: string;
  // Add other properties if needed
}

interface FavoriteState {
  data: FavoriteItem[];
}

const initialState: FavoriteState = {
  data: [],
};

export const FavoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavData: (state, action: PayloadAction<FavoriteItem>) => {
      const newData = action.payload;
      const existingDataIndex = state.data.findIndex(
        (item) => item.id === newData.id
      );
      if (existingDataIndex === -1) {
        // If data with the same vod_id doesn't exist, add it
        state.data = [...state.data, newData];
      } else {
        state.data = state.data.filter((item) => item.id !== newData.id);
      }
    },
  },
});

// Actions generated from the slice
export const { setFavData } = FavoriteSlice.actions;

// A selector to get the navbar data from the state
export const selectFavData = (state: { favorite: FavoriteState }) =>
  state.favorite.data;

// The reducer
export default FavoriteSlice.reducer;
