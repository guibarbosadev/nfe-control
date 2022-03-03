import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserCredentials } from "./authTypes";
import * as services from "../../services";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: UserCredentials) => {
    return await services.login(credentials);
  }
);

export const signUp = createAsyncThunk("auth/signUp", async (user: User) => {
  return await services.signUp(user);
});

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const user = await services.getLoggedInUser();

    if (!user) {
      throw new Error();
    }

    return user;
  }
);
