import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { History } from "./types";

// Define a type for the slice state
export type HistorySliceState = {
  histories?: History[];
};

// Define the initial state using that type
const initialState: HistorySliceState = {};

export const userSlice = createSlice({
  name: "history",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<History[] | undefined>) => {
      state.histories = action.payload;
    },
  },
});

export const { setHistory } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getHistory = (state: RootState) => state.history.histories;

export default userSlice.reducer;
