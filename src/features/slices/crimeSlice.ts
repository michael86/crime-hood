import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrimeInterface, Arrests, Searches } from "../../interfaces";

const initialState: CrimeInterface = { arrests: [[]], searches: [[]] };

export const CrimesSlice = createSlice({
  name: "crime",
  initialState,

  reducers: {
    setArrests: (state, action: PayloadAction<Arrests[]>) => {
      state.arrests[0] = action.payload;
      return state;
    },
    setSearches: (state, action: PayloadAction<Searches[]>) => {
      state.searches[0] = action.payload;
      return state;
    },
  },
});

export const { setArrests, setSearches } = CrimesSlice.actions;

export default CrimesSlice.reducer;
