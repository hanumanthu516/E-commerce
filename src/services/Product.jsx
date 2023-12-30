import axios from "axios";
import {
  showErrorToast,
  showSuccessToast,
} from "../components/common/toast/CommonToastConfig";
import { setProductList } from "../redux/reducers/ProductSlice";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      axios
        .get("http://localhost:3001/products")
        .then((respose) => {
          if (respose) {
            dispatch(setProductList(respose.data));
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProductToCart = (payload) => {
  return async (dispatch) => {
    try {
      axios
        .post("http://localhost:3001/cartList", payload)
        .then((respose) => {
          showSuccessToast("Added successfully to the cart");
        })
        .catch((error) => {
          showErrorToast("Failed to add to the cart");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
};
