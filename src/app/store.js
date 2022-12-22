import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import messageReducer from "../features/message";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
