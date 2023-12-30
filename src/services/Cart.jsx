import axios from "axios";
import { setCartList } from "../redux/reducers/CartSlice";

export const getCartDetails = () => {
  return async (dispatch) => {
    try {
      axios
        .get("http://localhost:3001/cartList")
        .then((resp) => dispatch(setCartList(resp.data)))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};
