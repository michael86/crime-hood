import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Interface = {
  arrests: Arrests[] | [];
  searches: Arrests[] | [];
};

export interface Arrests {
  age_range: string | null;
  datetime: string;
  gender: string | null;
  involved_person: boolean | null;
  legislation: string | null;
  location: {
    latitude: string;
    longitude: string;
    street: { id: number; name: string };
  };
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
const initialState: Interface = { arrests: [], searches: [] };

export const CrimesSlice = createSlice({
  name: "crime",
  initialState,

  reducers: {
    setArrests: (state, action: PayloadAction<Arrests[]>) => {
      state.arrests = action.payload;
      return state;
    },
    setSearches: (state, action: PayloadAction<Arrests[]>) => {
      state.searches = action.payload;
      return state;
    },
  },
});

export const { setArrests, setSearches } = CrimesSlice.actions;

export default CrimesSlice.reducer;
