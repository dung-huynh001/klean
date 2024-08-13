import { jwtDecode } from "jwt-decode";
import { LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";
import axiosInstance from "~/utils/request";

interface iCredential {
  username: string;
  password: string;
}

export const login =
  (credentials: iCredential) =>
  async (dispatch: Function) => {
    try {
      const response = await axiosInstance.post("Auth/Login", credentials);
      const token = response.data.token;

      localStorage.setItem("token", token);
      const tokenData = jwtDecode(token);

      return dispatch({
        type: LOGIN_SUCCESS,
        payload: tokenData,
      });
    } catch (err) {
      return Promise.reject(err.data ? err.data : err);
    }
  };

export const logout = (): Function => (dispatch: Function) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
    payload: {},
  });
};
