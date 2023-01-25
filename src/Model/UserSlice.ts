import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage } from "./tokenManager";
import { User } from "./types";

// Define a type for the slice state
export type UserSliceState = {
  token?: string;
  authenticatedUser?: User;
  users?: User[];
  editedUser?: User;
};

// Define the initial state using that type
const initialState: UserSliceState = {
  token: getTokenFromLocalStorage(),
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      delete state.token;
    },
    setAuthenticatedUser: (state, action: PayloadAction<User>) => {
      state.authenticatedUser = action.payload;
    },
    changeUserBalance: (state, action: PayloadAction<number>) => {
      if (state.authenticatedUser)
        state.authenticatedUser.balance += action.payload;
    },
    setUsersList: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setEditedUser: (state, action: PayloadAction<User | undefined>) => {
      state.editedUser = action.payload;
    },
  },
});

export const {
  setToken,
  clearToken,
  setAuthenticatedUser,
  changeUserBalance,
  setUsersList,
  setEditedUser,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getToken = (state: RootState) => state.user.token;
export const getAuthenticatedUser = (state: RootState) =>
  state.user.authenticatedUser;
export const getUsers = (state: RootState) => state.user.users;
export const getEditedUser = (state: RootState) => state.user.editedUser;

export default userSlice.reducer;
