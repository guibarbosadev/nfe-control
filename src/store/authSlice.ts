import { AuthState } from "./authTypes";
import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "./authActions";

const initialState: AuthState = {
  user: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = "error";
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default authSlice.reducer;
