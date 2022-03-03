import { NfeState } from "./nfeTypes";
import { createSlice } from "@reduxjs/toolkit";
import { getNfes } from "./nfeActions";

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
      .addCase(getNfes.rejected, (state, action) => {
        state.status = "error";
        console.log(action.error);
      });
  },
});
const { reducer: nfeReducer } = nfeSlice;

export default nfeReducer;
