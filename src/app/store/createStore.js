import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import registerReducer from "./reducers/registerSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
  },
});
