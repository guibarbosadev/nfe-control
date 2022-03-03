import { NfeFilter, NfeGraphModes, NfeState } from "./nfeTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNfes, registerNfe } from "./nfeActions";
import {
  calcRemainingTotal,
  getNfesTotalByMonth,
  NFE_TOTAL_BY_YEAR,
} from "../../app/util";

const currentDate = new Date();
const initialState: NfeState = {
  nfes: [],
  totalsByMonth: [],
  filter: {
    graph: NfeGraphModes.TotalByMonth,
    year: currentDate.getFullYear(),
  },
  status: "idle",
  remainingTotal: NFE_TOTAL_BY_YEAR,
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
      state.remainingTotal = calcRemainingTotal(year, nfesTotalByMonth);
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
        state.remainingTotal = calcRemainingTotal(
          state.filter.year,
          state.totalsByMonth
        );
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
