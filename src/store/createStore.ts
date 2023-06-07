import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './reducers/appSlice/slice';
import { authReducer } from './reducers/authSlice/slice';
import basketReducer from './reducers/basketSlice';
import categoryReducer from './reducers/categorySlice';
import { commonReducer } from './reducers/commonSlice/slice';
import filterReducer from './reducers/filterSlice';
import { mainPageReducer } from './reducers/mainPageSlice';
import manageProductsReducer from './reducers/manageProductsSlice';
import modalReducer from './reducers/modalSlice';
import paginateReducer from './reducers/paginateSlice';
import { popularProductsReducer } from './reducers/popularProducts';
import productPaginateReducer from './reducers/productPaginateSlice';
import productReducer from './reducers/productSlice';
import sellerCheckoutSlice from './reducers/sellerCheckoutSlice';
import sellerSlice from './reducers/sellerSlice';
import { similarProductsReducer } from './reducers/similarProducts';
import { supplierOtherReducer } from './reducers/supplier/other/slice';
import { supplierProfileReducer } from './reducers/supplier/profile/slice';
import { targetProductReducer } from './reducers/targetProductSlice';
import { userReducer } from './reducers/userSlice/slice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    supplierProfile: supplierProfileReducer,
    supplierOther: supplierOtherReducer,

    product: productReducer,
    targetProduct: targetProductReducer,
    paginate: paginateReducer,
    productPaginate: productPaginateReducer,
    basket: basketReducer,
    filter: filterReducer,
    category: categoryReducer,
    manageProducts: manageProductsReducer,
    mainPageProducts: mainPageReducer,
    modal: modalReducer,
    similarProducts: similarProductsReducer,
    popularProducts: popularProductsReducer,
    seller: sellerSlice,
    sellerCheckout: sellerCheckoutSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
