import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthType } from "../../types";

// Define a type for the slice state
export interface AuthState {
  auth: AuthType | undefined;
}

// Define the initial state using that type
const initialState: AuthState = { auth: undefined };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (_, action: PayloadAction<AuthState>) => action.payload,
    signOut: () => ({ auth: undefined }),
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
