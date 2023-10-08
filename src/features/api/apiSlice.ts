import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "./test_data.json";
import { Api, Crimes } from "./interfaces";
import { LatLngExpression } from "leaflet";

const initialState: Api = {
  locations: [51.505, -0.09],
  crimes: data,
};

export const ApiSlice = createSlice({
  name: "api",
  initialState,

  reducers: {
    setCrimes: (state, action: PayloadAction<[Crimes]>) => {
      state.crimes = action.payload;
    },
    setLocations: (state, action: PayloadAction<LatLngExpression>) => {
      state.locations = action.payload;
    },
  },
});

export const { setCrimes, setLocations } = ApiSlice.actions;

export default ApiSlice.reducer;
