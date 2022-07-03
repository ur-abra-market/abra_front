import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/counterSlice";
import userReducer from "./users";

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
  },
});
