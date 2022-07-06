import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/counterSlice";
import loginReducer from "./reducers/loginSlice";
import registerReducer from './reducers/registerSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    counter: counterReducer,
  },
});
