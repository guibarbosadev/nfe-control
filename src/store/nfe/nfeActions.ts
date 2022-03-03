import { createAsyncThunk } from "@reduxjs/toolkit";
import * as nfeService from "../../services/nfeService";
import { Nfe } from "./nfeTypes";

export const getNfes = createAsyncThunk(
  "nfe/getNfes",
  async (email: string) => {
    return await nfeService.fetchNfes(email);
  }
);

interface RegisterNfeParams {
  email: string;
  nfe: Nfe;
}

export const registerNfe = createAsyncThunk(
  "nfe/registerNfe",
  async ({ email, nfe }: RegisterNfeParams) => {
    return await nfeService.registerNfe(email, nfe);
  }
);
