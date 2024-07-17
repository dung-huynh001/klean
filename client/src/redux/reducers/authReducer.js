import { Navigate } from "react-router-dom";
import { LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const token = localStorage.getItem("token");
try {
  const deToken = (token === null || token === undefined) ? null : jwtDecode(token);
  if (deToken && deToken.exp && deToken.exp < Date.now()) {

    initialState.isAuthenticated = true;
    initialState.user = deToken;
  }
} catch {
  console.log(">>> Token is invalid");
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};
export default authReducer;
