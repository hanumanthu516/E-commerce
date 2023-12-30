import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartList: (state, action) => {
      state.cartList = action.payload;
    },
    incrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const item = state.cartList.find(
        (item) => item.cartDetails.productId === productId
      );
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const item = state.cartList.find(
        (item) => item.cartDetails.productId === productId
      );
      if (item && item.quantity && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    deleteCartItem: (state, action) => {
      const { productId } = action.payload;
      state.cartList = state.cartList.filter(
        (item) => item.cartDetails.productId !== productId
      );
    },
  },
});

export const {
  setCartList,
  incrementQuantity,
  decrementQuantity,
  deleteCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
