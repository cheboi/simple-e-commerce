import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URI = "https://simple-e-comerce-default-rtdb.firebaseio.com/cart.json";

const initialState = {
  cartItems: sessionStorage.getItem("cartItems")
    ? JSON.parse(sessionStorage.getItem("cartItems"))
    : [],
  cartQuantity: 0,
  totalAmount: 0,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// export const addItemToCart = createAsyncThunk(
//   "cart/addNewItemToCart",
//   async (initialProduct) => {
//     const response = await axios.post(URI, initialProduct);
//     return response.data;
//   }
// );

//
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await axios.get(
    "https://simple-e-comerce-default-rtdb.firebaseio.com/cart.json"
  );

  console.log("data " + response.data);

  let ourdata = [];
  console.log(response.data);
  console.log("My Data" + response.data);
  for (let key in response.data) {
    ourdata.push({
      id: key,
      image: response.data[key].image,
      description: response.data[key].body,
      price: response.data[key].price,
      product_id: response.data[key].id,
      discountRate: response.data[key].discountRate,
      title: response.data[key].title,
    });
  }

  return ourdata;
});

export const updateCart = createAsyncThunk(
  "cart/incrementCartQuantity",
  async (product) => {
    const response = await axios.put(
      `https://simple-e-comerce-default-rtdb.firebaseio.com/cart/${product.id}.json`,
      product.quantity
    );
  }
);

export const decreaseCartQuantity = createAsyncThunk(
  "cart/decreaseCartQuantity",
  async (product) => {
    const response = await axios.put(
      `https://simple-e-comerce-default-rtdb.firebaseio.com/cart/${product.id}.json`,
      product.quantity
    );
  }
);

export const deleteCart = createAsyncThunk(
  "products/deleteCart",
  async (cart) => {
    try {
      const response = await axios.delete(
        `https://simple-e-comerce-default-rtdb.firebaseio.com/cart/${cart.id}.json`
      );
      return response.status;
    } catch (error) {}
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addToCart",
  async (product) => {
    try {
      const response = axios.post(
        `https://simple-e-comerce-default-rtdb.firebaseio.com/cart${product.id}/Products.json`,
        product
      );
      getCart(product.id);
      return response.message;
    } catch (error) {}
  }
);
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
        let tempItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempItem);
      }
      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
      }

      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;
        }
        sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total: parseFloat(total.toFixed(2));
      state.cartQuantity = quantity;
      state.totalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.cartItems = action.payload.message.error;
      });
  },
});

export const { addToCart, decreaseCart, getTotals, clearCart, removeCartItem,  } =
  cartSlice.actions;
export const selectAllCartItems = (state) => state.cart?.cartItems;
export const getCartItemsStatus = (state) => state.cart?.status;
export const getCartItemsError = (state) => state.cart?.error;

export default cartSlice.reducer;
