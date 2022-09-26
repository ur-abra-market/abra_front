import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/counterSlice";
import loginReducer from "./reducers/loginSlice";
import registerReducer from './reducers/registerSlice'
import categoryReducer from './reducers/categorySlice'

export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        counter: counterReducer,
        category: categoryReducer
    },
});
