import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import ApiReducer from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    api: ApiReducer,
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
