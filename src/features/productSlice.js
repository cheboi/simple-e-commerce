import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";

URL = "https://simple-e-comerce-default-rtdb.firebaseio.com/product.json";
const initialState = {
  products: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "products/addNewProduct",
  async (initialProduct) => {
    const response = await axios.post(URL, initialProduct);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: {
      reducer(state, action) {
        state.products.push(action.payload);
      },
      prepare(title, description, img_url, discount_rate, price) {
        return {
          payload: {
            title,
            description,
            img_url,
            discount_rate,
            price,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.products = action.payload.message.error;
      });
  },
});

export const { fetchProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export const { addNewProduct } = productSlice.actions;

export default productSlice.reducer;
