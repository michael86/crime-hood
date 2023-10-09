import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "./test_data.json";
import { Api, Crimes } from "./interfaces";
import { Coords } from "../../app/interfaces";

const initialState: Api = {
  locations: {
    latitude: 51.505, //default london
    longitude: -0.09,
  },
  crimes: [],
};

export const ApiSlice = createSlice({
  name: "api",
  initialState,

  reducers: {
    setCrimes: (state, action: PayloadAction<[Crimes]>) => {
      state.crimes = action.payload;
    },
    setLocations: (state, action: PayloadAction<Coords>) => {
      state.locations = action.payload;
    },
  },
});

export const { setCrimes, setLocations } = ApiSlice.actions;

export default ApiSlice.reducer;
