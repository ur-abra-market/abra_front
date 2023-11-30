import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './reducers/appSlice/slice';
import { authReducer } from './reducers/authSlice/slice';
import basketReducer from './reducers/basketSlice';
import categoryReducer from './reducers/categorySlice';
import { commonReducer } from './reducers/commonSlice/slice';
import filterReducer from './reducers/filterSlice';
import { popularProductsReducer } from './reducers/popularProducts';
import { productReducer } from './reducers/productSlice';
import { productOldReducer } from './reducers/productSliceOld';
import { searchReducer } from './reducers/searchSlice';
import { sellerCartReducer } from './reducers/seller/cart';
import { sellerProfileReducer } from './reducers/seller/profile/slice';
import { similarProductsReducer } from './reducers/similarProducts';
import { supplierOtherReducer } from './reducers/supplier/other/slice';
import { supplierProductReducer } from './reducers/supplier/product';
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
    sellerProfile: sellerProfileReducer,
    product: productReducer,
    supplierProduct: supplierProductReducer,

    productListOld: productOldReducer,
    targetProduct: targetProductReducer,
    search: searchReducer,
    basket: basketReducer,
    filter: filterReducer,
    category: categoryReducer,
    similarProducts: similarProductsReducer,
    popularProducts: popularProductsReducer,
    sellerCart: sellerCartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
