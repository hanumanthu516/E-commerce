import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};
export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
  },
});

export const { setProductList } = productSlice.actions;

export default productSlice.reducer;
