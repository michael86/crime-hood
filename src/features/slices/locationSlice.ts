import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Locations = [number[]];

const initialState: Locations = [[51.505, -0.09]];

export const LocationsSlice = createSlice({
  name: "locations",
  initialState,

  reducers: {
    setLocations: (state, action: PayloadAction<Locations>) => {
      console.log(state);
      console.log(action.payload);
      state = action.payload;
      console.log(state);
    },
  },
});

export const { setLocations } = LocationsSlice.actions;

export default LocationsSlice.reducer;
