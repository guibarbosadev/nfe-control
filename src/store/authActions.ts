import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./authTypes";
import * as services from "../services";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    return await services.login(credentials);
  }
);

export const signUp = createAsyncThunk("auth/signUp", async (user: User) => {
  return await services.signUp(user);
});
