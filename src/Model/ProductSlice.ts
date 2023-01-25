import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./types";

// Define a type for the slice state
export type ProductSliceState = {
  products?: Product[];
  editedProduct?: Product;
};

// Define the initial state using that type
const initialState: ProductSliceState = {};

export const productsSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setEditedProduct: (state, action: PayloadAction<Product | undefined>) => {
      state.editedProduct = action.payload;
    },
  },
});

export const { setProducts, setEditedProduct } = productsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getProducts = (state: RootState) => state.products.products;
export const getEditedProduct = (state: RootState) =>
  state.products.editedProduct;

export default productsSlice.reducer;
