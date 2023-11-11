import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces";

const initialState: UserInterface = {
  locationShared: false,
  crimes: true,
  searches: true,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setLocationShared: (state, action: PayloadAction<UserInterface>) => {
      state.locationShared = action.payload.locationShared;
      return state;
    },
    setShowCrimes: (state, action: PayloadAction<boolean>) => {
      state.crimes = action.payload;
      return state;
    },
    setShowSearches: (state, action: PayloadAction<boolean>) => {
      state.searches = action.payload;
      return state;
    },
  },
});

export const { setLocationShared, setShowCrimes, setShowSearches } =
  UserSlice.actions;

export default UserSlice.reducer;
