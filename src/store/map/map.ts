// store/mapSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  positions: [
    { id: 1, name: "Valledupar", coords: [10.4762, -73.2506] },
    { id: 2, name: "Bogotá", coords: [4.711, -74.0721] },
  ],
  selectedPosition: 1, // Por defecto, selecciona Valledupar
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setSelectedPosition(state, action) {
      state.selectedPosition = action.payload;
    },
  },
});

export const { setSelectedPosition } = mapSlice.actions;
export default mapSlice.reducer;
