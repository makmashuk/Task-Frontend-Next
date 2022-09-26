import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
export interface ISnackbar {
  open: boolean;
  severity: "success" | "info" | "warning" | "error";
  message: string;
}
const initialState: ISnackbar = {
  message: "",
  open: false,
  severity: "success",
};
export const snackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    successSnackbar: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.severity = "success";
      state.message = action.payload;
    },
    errorSnackbar: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.severity = "error";
      state.message = action.payload;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { successSnackbar, errorSnackbar, closeSnackbar } =
  snackBarSlice.actions;
export const selectSnackbar = (state: RootState) => state.snackbar;
export const snackbarReducer = snackBarSlice.reducer;
