import { PayloadAction } from "@reduxjs/toolkit";
import { LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";
import { jwtDecode } from "jwt-decode";

interface iAuthState {
  isAuthenticated: boolean;
  user: {};
}

const token = localStorage.token;

const initialState = (): iAuthState => {
  try {
    const deToken =
      token === null || token === undefined ? null : jwtDecode(token);
    if (deToken && !isTokenExpired(deToken.exp)) {
      return {
        isAuthenticated: true,
        user: deToken,
      };
    }

    return {
      isAuthenticated: false,
      user: {},
    };
  } catch {
    console.log(">>> Token is invalid");
    return {
      isAuthenticated: false,
      user: {},
    };
  }
};

const isTokenExpired = (expiredTime) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > expiredTime;
};

const authReducer = (
  state: iAuthState = initialState(),
  action: PayloadAction<{}>
): iAuthState => {
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
        user: {}
      }
    default: 
      return state;
  }
};

export default authReducer;