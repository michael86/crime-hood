import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces";

const initialState: UserInterface = {};

export const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setLocationShared: (state, action: PayloadAction<UserInterface>) => {
      state.locationShared = action.payload.locationShared;
      return state;
    },
  },
});

export const { setLocationShared } = UserSlice.actions;

export default UserSlice.reducer;
