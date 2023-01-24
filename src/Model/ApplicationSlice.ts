import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage } from "./tokenManager";
import { OptionsObject } from "notistack";

export type Pages = "login" | "mainMenu" | "users";

export type SnackBarMessage = {
  message: string;
  options: OptionsObject;
};

// Define a type for the slice state
export type ApplicationSliceState = {
  currentPage: Pages;
  openedDrawer: boolean;
  messagesToShow: SnackBarMessage[];
  resetCode?: string;
};
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Define the initial state using that type
// Si le code de reset est présent, on redirige vers la page de reset de mdp
// sinon, on determine si l'utilisateur est connecté, si oui, mainpanel, sinon loginpanel
const initialState: ApplicationSliceState = {
  currentPage: getTokenFromLocalStorage() ? "mainMenu" : "login",
  openedDrawer: false,
  messagesToShow: [],
  resetCode: urlParams.get("code") ? urlParams.get("code") + "" : undefined,
};

export const applicationSlice = createSlice({
  name: "application",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<Pages>) => {
      state.currentPage = action.payload;
    },
    switchDrawer: (state) => {
      state.openedDrawer = !state.openedDrawer;
    },
    addSnackbarMessage: (state, action: PayloadAction<SnackBarMessage>) => ({
      ...state,
      messagesToShow: [...state.messagesToShow, action.payload],
    }),
    removeFirstSnackbarMessage: (state) => {
      state.messagesToShow.shift();
    },
    clearResetCode: (state) => {
      delete state.resetCode;
    },
  },
});

export const {
  changePage,
  switchDrawer,
  addSnackbarMessage,
  removeFirstSnackbarMessage,
  clearResetCode,
} = applicationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getCurrentPage = (state: RootState) =>
  state.application.currentPage;

export const isDrawerOpened = (state: RootState) =>
  state.application.openedDrawer;

export const getSnackbarMessages = (state: RootState) =>
  state.application.messagesToShow;

export const getResetCode = (state: RootState) => state.application.resetCode;

export default applicationSlice.reducer;
