import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import registerReducer from "./reducers/registerSlice";
import productReducer from "./reducers/productSlice";
import paginateReducer from "./reducers/paginateSlice";
import productPaginateReducer from "./reducers/productPaginateSlice";
import basketReducer from "./reducers/basketSlice";
import filterReducer from "./reducers/filterSlice";
import categoryReducer from "./reducers/categorySlice";
import formRegistrationReducer from "./reducers/formRegistrationSlice";
import supplierReducer from "./reducers/supplierSlice";
import manageProductsReducer from "./reducers/manageProductsSlice";
import supplierAccountReducer from "./reducers/supplierAccountSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    product: productReducer,
    paginate: paginateReducer,
    productPaginate: productPaginateReducer,
    basket: basketReducer,
    filter: filterReducer,
    category: categoryReducer,
    formRegistration: formRegistrationReducer,
    supplier: supplierReducer,
    supplierAccount: supplierAccountReducer,
    manageProducts: manageProductsReducer,
  },
});
