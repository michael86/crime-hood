import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LocationSlice = { geoCoords: [number[]]; panTo: boolean };

const initialState: LocationSlice = {
  geoCoords: [[51.505, -0.09]],
  panTo: false,
};

export const LocationsSlice = createSlice({
  name: "locations",
  initialState,

  reducers: {
    setLocations: (state, action: PayloadAction<[number[]]>) => {
      state.geoCoords = action.payload;
      return state;
    },
    setPanTo: (state, action: PayloadAction<boolean>) => {
      state.panTo = action.payload;
    },
  },
});

export const { setLocations, setPanTo } = LocationsSlice.actions;

export default LocationsSlice.reducer;
