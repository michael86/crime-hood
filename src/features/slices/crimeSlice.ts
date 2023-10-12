import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Interface = Crimes[] | [];

export interface Crimes {
  age_range: string | null;
  datetime: string;
  gender: string | null;
  involved_person: boolean | null;
  legislation: string | null;
  location: { latitude: string; longitude: string; street: { id: number; name: string } };
  object_of_search: null | string | boolean;
  officer_defined_ethnicity: string | null;
  operation: boolean | null;
  operation_name: string | null;
  outcome: string | null;
  outcome_linked_to_object_of_search: null | boolean;
  outcome_object: { id: string; name: string } | null;
  removal_of_more_than_outer_clothing: null | boolean;
  self_defined_ethnicity: string | null;
  type: string | null;
}
const initialState: Interface = [];

export const CrimesSlice = createSlice({
  name: "crime",
  initialState,

  reducers: {
    setCrimes: (state, action: PayloadAction<Crimes[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCrimes } = CrimesSlice.actions;

export default CrimesSlice.reducer;
