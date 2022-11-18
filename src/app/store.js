import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productsReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
