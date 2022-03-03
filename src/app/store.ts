import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../store/auth/authSlice";
import nfeReducer from "../store/nfe/nfeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nfe: nfeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
