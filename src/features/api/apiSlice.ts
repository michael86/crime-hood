import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "./test_data.json";

export interface ApiState {
  location: [number, number];
  crimes: Crimes | {}
}

export interface Crimes {
     
    age_range: string,
    outcome:string,
    involved_person: boolean,
    self_defined_ethnicity: string,
    gender: string,
    legislation: string
    "outcome_linked_to_object_of_search": null,
    datetime: string
    "removal_of_more_than_outer_clothing": null,
    outcome_object: {
      id: string,
      name: string
    },
    location: {
      latitude: string,
      street: { id: number, name: string },
      longitude: string
    },
    operation: boolean,
    officer_defined_ethnicity: string
    type: string
    "operation_name": null,
    "object_of_search": null
  
}
const initialState: ApiState = {
  []
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export default counterSlice.reducer;
