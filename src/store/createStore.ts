import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './reducers/appSlice/slice';
import { authReducer } from './reducers/authSlice/slice';
import basketReducer from './reducers/basketSlice';
import categoryReducer from './reducers/categorySlice';
import commonSlice from './reducers/commonSlice';
import filterReducer from './reducers/filterSlice';
import formRegistrationReducer from './reducers/formRegistrationSlice';
import loginReducer from './reducers/loginSlice';
import { mainPageReducer } from './reducers/mainPageSlice';
import manageProductsReducer from './reducers/manageProductsSlice';
import modalReducer from './reducers/modalSlice';
import paginateReducer from './reducers/paginateSlice';
import passwordSlice from './reducers/passwordSlice';
import { popularProductsReducer } from './reducers/popularProducts';
import productPaginateReducer from './reducers/productPaginateSlice';
import productReducer from './reducers/productSlice';
import sellerCheckoutSlice from './reducers/sellerCheckoutSlice';
import sellerSlice from './reducers/sellerSlice';
import { similarProductsReducer } from './reducers/similarProducts';
import supplierAccountReducer from './reducers/supplierAccountSlice';
import supplierReducer from './reducers/supplierSlice';
import { targetProductReducer } from './reducers/targetProductSlice';
import userReducer from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    login: loginReducer,
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
    seller: sellerSlice,
    sellerCheckout: sellerCheckoutSlice,
    passwordSlice,
    common: commonSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
