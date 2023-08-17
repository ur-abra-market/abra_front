import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './reducers/appSlice/slice';
import { authReducer } from './reducers/authSlice/slice';
import basketReducer from './reducers/basketSlice';
import categoryReducer from './reducers/categorySlice';
import { commonReducer } from './reducers/commonSlice/slice';
import filterReducer from './reducers/filterSlice';
import manageProductsReducer from './reducers/manageProductsSlice';
import { popularProductsReducer } from './reducers/popularProducts';
import productPaginateReducer from './reducers/productPaginateSlice';
import { productReducer } from './reducers/productSlice';
import { productOldReducer } from './reducers/productSliceOld';
import { sellerProfileReducer } from './reducers/seller/profile/slice';
import { similarProductsReducer } from './reducers/similarProducts';
import { supplierOtherReducer } from './reducers/supplier/other/slice';
import { supplierProfileReducer } from './reducers/supplier/profile/slice';
import { supplierProductReducer } from './reducers/supplierProductSlice/supplierProductSlice';
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
    sellerProfile: sellerProfileReducer,
    product: productReducer,
    supplierProduct: supplierProductReducer,

    productListOld: productOldReducer,
    targetProduct: targetProductReducer,
    productPaginate: productPaginateReducer,
    basket: basketReducer,
    filter: filterReducer,
    category: categoryReducer,
    manageProducts: manageProductsReducer,
    similarProducts: similarProductsReducer,
    popularProducts: popularProductsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
