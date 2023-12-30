import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductSliceReducer from "./reducers/ProductSlice";
import authSliceReducer from "./reducers/AuthSlice";
import cartSliceReducer from "./reducers/CartSlice";

const reducers = combineReducers({
  products: ProductSliceReducer,
  login: authSliceReducer,
  cart: cartSliceReducer,
});

export default configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
