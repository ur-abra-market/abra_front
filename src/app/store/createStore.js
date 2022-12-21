import {configureStore} from '@reduxjs/toolkit'
import loginReducer from './reducers/loginSlice'
import registerReducer from './reducers/registerSlice'
import productReducer from './reducers/productSlice'
import paginateReducer from './reducers/paginateSlice'
import productPaginateReducer from './reducers/productPaginateSlice'
import basketReducer from './reducers/basketSlice'
import filterReducer from './reducers/filterSlice'
import categoryReducer from './reducers/categorySlice'
import formRegistrationReducer from './reducers/formRegistrationSlice'
import supplierReducer from './reducers/supplierSlice'
import manageProductsReducer from './reducers/manageProductsSlice'
import supplierAccountReducer from './reducers/supplierAccountSlice'
import userReducer from './reducers/userSlice'
import modalReducer from './reducers/modalSlice'
import {mainPageReducer} from './reducers/mainPageSlice'
import {similarProductsReducer} from './reducers/similarProducts'
import {targetProductReducer} from './reducers/targetProductSlice'
import {popularProductsReducer} from './reducers/popularProducts'


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
    },
    devTools: process.env.NODE_ENV !== 'production',
})
