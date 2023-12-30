import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: false,
  userDetails: [],
};

export const authSlice = createSlice({
  name: "authLogin",
  initialState: initialState,
  reducers: {
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setIsUserLoggedIn, setUserDetails } = authSlice.actions;

export default authSlice.reducer;
