import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import registerReducer from "./reducers/registerSlice";
import productReducer from "./reducers/productSlice";
import paginateReducer from "./reducers/paginateSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    product: productReducer,
    paginate: paginateReducer,
  },
});
