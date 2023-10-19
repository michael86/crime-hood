import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../app/interfaces";

const initialState: User = {};

export const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setLocationShared: (state, action: PayloadAction<User>) => {
      state.locationShared = action.payload.locationShared;
      return state;
    },
  },
});

export const { setLocationShared } = UserSlice.actions;

export default UserSlice.reducer;
