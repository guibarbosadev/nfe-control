import { createAsyncThunk } from "@reduxjs/toolkit";
import * as nfeService from "../../services/nfeService";

export const getNfes = createAsyncThunk(
  "nfe/getNfes",
  async (email: string) => {
    return await nfeService.fetchNfes(email);
  }
);
