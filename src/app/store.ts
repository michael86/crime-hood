import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import CrimesReducer from "../features/slices/crimeSlice";
import LocationsReducer from "../features/slices/locationSlice";
import UserReducer from "../features/slices/userSlice";

export const store = configureStore({
  reducer: {
    locations: LocationsReducer,
    crimes: CrimesReducer,
    user: UserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
