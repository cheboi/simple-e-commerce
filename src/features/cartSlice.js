import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItemslocalStorage: getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems")): [],
  cartQuantity: 0,
  totalAmount:0
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
    reducers: {
        addToCart(state, action) {
          const existingIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id
          );
    
          if (existingIndex >= 0) {
            state.cartItems[existingIndex] = {
              ...state.cartItems[existingIndex],
              cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
            };
          } else {
            let tempProductItem = { ...action.payload, cartQuantity: 1 };
            state.cartItems.push(tempProductItem);
          }
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
