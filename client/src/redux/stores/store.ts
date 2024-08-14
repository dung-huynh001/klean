import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export default store;
