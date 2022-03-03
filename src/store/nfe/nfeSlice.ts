import { NfeFilter, NfeGraphModes, NfeState } from "./nfeTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNfes, registerNfe } from "./nfeActions";
import { getNfesTotalByMonth } from "../../app/util";

const currentDate = new Date();
const initialState: NfeState = {
  nfes: [],
  totalsByMonth: [],
  filter: {
    graph: NfeGraphModes.TotalByMonth,
    year: currentDate.getFullYear(),
  },
  status: "idle",
};

const nfeSlice = createSlice({
  initialState,
  name: "nfe",
  reducers: {
    filterNfes: (state, action: PayloadAction<NfeFilter>) => {
      const { year } = action.payload;
      const { nfes } = state;
      const nfesTotalByMonth = getNfesTotalByMonth(year, nfes);

      state.filter = action.payload;
      state.totalsByMonth = nfesTotalByMonth;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNfes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNfes.fulfilled, (state, action) => {
        state.nfes = action.payload;
        state.totalsByMonth = getNfesTotalByMonth(
          state.filter.year,
          action.payload
        );
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

export const { filterNfes } = nfeSlice.actions;

export default nfeReducer;
