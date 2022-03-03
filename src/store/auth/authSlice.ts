import { AuthState } from "./authTypes";
import { createSlice } from "@reduxjs/toolkit";
import { login, signUp, getCurrentUser, logout } from "./authActions";

const initialState: AuthState = {
  user: null,
  status: "loading",
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
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.status = "error";
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.status = "idle";
      });
  },
});
const { reducer: authReducer } = authSlice;

export default authReducer;
