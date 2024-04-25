import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface BreadcumbState {
  title: string;
  url: string;
}

// Define the initial state using that type
const initialState: BreadcumbState[] = [];

const breadcumbSlice = createSlice({
  name: "breadcumb",
  initialState,
  reducers: {
    setBreadcumb: (_state, action: PayloadAction<BreadcumbState[]>) =>
      action.payload,
  },
});

export const { setBreadcumb } = breadcumbSlice.actions;
export default breadcumbSlice.reducer;
