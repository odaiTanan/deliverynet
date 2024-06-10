import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import productsSlice from "./slices/products-slice";
import configureSlice from "./slices/configure-slice";
import userSlice from "./slices/user-slice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    baseUrl: configureSlice,
    user: userSlice,
  },
});
