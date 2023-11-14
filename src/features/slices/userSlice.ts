import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces";

const initialState: UserInterface = {
  locationShared: false,
  crimes: true,
  searches: true,
  limit: 0,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setLocationShared: (state, action: PayloadAction<UserInterface>) => {
      return { ...state, locationShared: action.payload.locationShared };
    },
    setShowCrimes: (state, action: PayloadAction<boolean>) => {
      return { ...state, crimes: action.payload };
    },
    setShowSearches: (state, action: PayloadAction<boolean>) => {
      return { ...state, searches: action.payload };
    },
    setLimit: (state, action: PayloadAction<number>) => {
      return { ...state, limit: action.payload };
    },
  },
});

export const { setLocationShared, setShowCrimes, setShowSearches, setLimit } =
  UserSlice.actions;

export default UserSlice.reducer;
