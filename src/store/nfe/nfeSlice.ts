import { NfeState } from "./nfeTypes";
import { createSlice } from "@reduxjs/toolkit";
import { getNfes, registerNfe } from "./nfeActions";

const initialState: NfeState = {
  nfes: [],
  filteredNfes: [],
  status: "idle",
};

const nfeSlice = createSlice({
  initialState,
  name: "nfe",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNfes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNfes.fulfilled, (state, action) => {
        state.nfes = action.payload;
        state.status = "success";
      })
      .addCase(getNfes.rejected, (state) => {
        state.status = "error";
      })
      .addCase(registerNfe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerNfe.fulfilled, (state, action) => {
        state.status = "success";
        state.nfes = action.payload;
      })
      .addCase(registerNfe.rejected, (state) => {
        state.status = "error";
      });
  },
});
const { reducer: nfeReducer } = nfeSlice;

export default nfeReducer;
