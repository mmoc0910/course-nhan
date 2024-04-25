import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthType } from "../../../types";



const initialState: AuthType[] = [];

const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {
    setChildren: (_, action: PayloadAction<AuthType[]>) => action.payload,
   
  },
});

export const { setChildren } = childrenSlice.actions;
export default childrenSlice.reducer;
