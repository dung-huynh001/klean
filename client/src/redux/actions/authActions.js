import { jwtDecode } from "jwt-decode";
import { LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";
import axiosInstance from "~/utils/request";

export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("Auth/Login", credentials);
    const token = res.data.token;

    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: decoded,
    });
  } catch (err) {
    console.log(">>> Check error: ", err);
    return err
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch({
    type: LOGOUT,
  });
};
