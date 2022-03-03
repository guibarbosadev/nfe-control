import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserCredentials } from "./authTypes";
import * as authService from "../../services/authService";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: UserCredentials) => {
    return await authService.login(credentials);
  }
);

export const signUp = createAsyncThunk("auth/signUp", async (user: User) => {
  return await authService.signUp(user);
});

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const user = await authService.getLoggedInUser();

    if (!user) {
      throw new Error();
    }

    return user;
  }
);

export const logout = createAsyncThunk("auth, logout", async () => {
  await authService.logout();
});
