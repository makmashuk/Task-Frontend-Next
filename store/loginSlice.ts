import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import authService from "../services/auth.service";
import { setTokens } from "../services/localStorage.service";
import { setCookie } from "cookies-next";

export interface IAuthentication {
  isProcessingRequest: boolean;
  isAuthenticated: boolean;
  message?: string;
}
export interface IUser {
  email: string;
  password: string;
}
export interface INewUser {
  name: string;
  email: string;
  password: string;
}

const initialState: IAuthentication = {
  isProcessingRequest: false,
  isAuthenticated: false,
};
export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    start: (state) => {
      state.isProcessingRequest = true;
      state.message = "";
    },
    success: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.isProcessingRequest = false;
    },
    error: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.isProcessingRequest = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});
export const registerUser = (userData: INewUser) => async (dispatch: any) => {
  try {
    dispatch(start());
    const authResponse = await authService.register(
      userData.name,
      userData.email,
      userData.password
    );
    setTokens(authResponse.access_token);
    setCookie("isLoggedIn", true);
    dispatch(success(authResponse));
  } catch (err: any) {
    dispatch(error(err?.response?.data?.message));
  }
};
export const authenticateUser = (userData: IUser) => async (dispatch: any) => {
  try {
    dispatch(start());
    const authResponse = await authService.login(
      userData.email,
      userData.password
    );
    setTokens(authResponse.access_token);
    setCookie("isLoggedIn", true);
    dispatch(success(authResponse));
  } catch (err: any) {
    dispatch(error(err?.message));
  }
};
export const { start, success, error, logout } = authenticationSlice.actions;
export const selectAuthentication = (state: RootState) => state.authentication;
export const authenticationReducer = authenticationSlice.reducer;
