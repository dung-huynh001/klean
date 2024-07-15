import { LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const token = localStorage.token ? jwtDecode(localStorage.token) : "";

if (token && token.exp < Date.now()) {
  initialState.isAuthenticated = true;
  initialState.user = token;
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
