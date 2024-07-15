import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../types/authTypes";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const token = localStorage.getItem("token");
const deToken = (token === null || token === undefined) ? jwtDecode(token) : null;

if (deToken && deToken.exp < Date.now()) {
  initialState.isAuthenticated = true;
  initialState.user = deToken;
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
