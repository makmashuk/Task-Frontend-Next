import * as React from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeSnackbar } from "../store/snackbarSlice";

export function SnackBar() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.snackbar.open);
  const message = useAppSelector((state) => state.snackbar.message);
  const severity = useAppSelector((state) => state.snackbar.severity);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
