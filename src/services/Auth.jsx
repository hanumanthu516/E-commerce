import { setUserDetails } from "../redux/reducers/AuthSlice";
import axios from "axios";

export const getLoggedInUserDetails = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      const loggedInUsername = localStorage.getItem("username");

      const loggedInUserData = response.data.find(
        (user) => user.userName === loggedInUsername
      );

      dispatch(setUserDetails(loggedInUserData));
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };
};
