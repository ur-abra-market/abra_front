import { configureStore } from '@reduxjs/toolkit';

import basketReducer from './reducers/basketSlice';
import categoryReducer from './reducers/categorySlice';
import filterReducer from './reducers/filterSlice';
import formRegistrationReducer from './reducers/formRegistrationSlice';
import loginReducer from './reducers/loginSlice';
import { mainPageReducer } from './reducers/mainPageSlice';
import manageProductsReducer from './reducers/manageProductsSlice';
import modalReducer from './reducers/modalSlice';
import paginateReducer from './reducers/paginateSlice';
import { popularProductsReducer } from './reducers/popularProducts';
import productPaginateReducer from './reducers/productPaginateSlice';
import productReducer from './reducers/productSlice';
import registerReducer from './reducers/registerSlice';
import { similarProductsReducer } from './reducers/similarProducts';
import supplierAccountReducer from './reducers/supplierAccountSlice';
import supplierReducer from './reducers/supplierSlice';
import { targetProductReducer } from './reducers/targetProductSlice';
import userReducer from './reducers/userSlice';
import passwordSlice from "./reducers/passwordSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    product: productReducer,
    targetProduct: targetProductReducer,
    paginate: paginateReducer,
    productPaginate: productPaginateReducer,
    basket: basketReducer,
    filter: filterReducer,
    category: categoryReducer,
    formRegistration: formRegistrationReducer,
    supplier: supplierReducer,
    supplierAccount: supplierAccountReducer,
    manageProducts: manageProductsReducer,
    mainPageProducts: mainPageReducer,
    user: userReducer,
    modal: modalReducer,
    similarProducts: similarProductsReducer,
    popularProducts: popularProductsReducer,
    passwordSlice:passwordSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
