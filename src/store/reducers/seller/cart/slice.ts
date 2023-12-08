import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getSellerDataCart } from './thunks';
import { IProductCardCart } from './types';

export interface IProductsInCart {
  productsPerPage: number;
  productsInCart: Array<IProductCardCart[]>;
  totalProductForOrder: number;
}

const initialState: IProductsInCart = {
  productsPerPage: 20,
  productsInCart: [],
  totalProductForOrder: 0,
};

const sellerProfileSlice = createSlice({
  name: 'seller/cart',
  initialState,
  reducers: {
    setProductsInCartPerPage: (state, action: PayloadAction<number>) => {
      state.productsPerPage = action.payload;
    },
    setSelectProduct: (state, action: PayloadAction<{ id: number | null }>) => {
      const product = state.productsInCart
        .flat()
        .find(item => item.bundle_variation_pod.product.id === action.payload.id);

      if (product) {
        product.is_checked = !product.is_checked;
      }
    },
    setSelectAllProducts: (
      state,
      action: PayloadAction<{
        is_checked: boolean;
        name: string;
      }>,
    ) => {
      state.productsInCart = state.productsInCart.map(item => {
        const isCheckedAll = item.every(
          product =>
            product.bundle_variation_pod.product.supplier.company.name ===
            action.payload.name,
        );

        if (isCheckedAll) {
          return item.map(product => {
            return { ...product, is_checked: action.payload.is_checked };
          });
        }

        return item;
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(getSellerDataCart.fulfilled, (state, action) => {
      const product_cart: IProductCardCart[] = [];

      action.payload.forEach(item => product_cart.push(...item.details));

      const productsWithSupplier: Record<string, IProductCardCart[]> =
        product_cart.reduce(
          (
            products_with_name: Record<string, IProductCardCart[]>,
            products: IProductCardCart,
          ) => {
            const supplierName =
              products.bundle_variation_pod.product.supplier.company.name;

            return {
              ...products_with_name,
              [supplierName]: [
                ...(products_with_name[supplierName] || []),
                {
                  ...products,
                  is_checked: true,
                },
              ],
            };
          },
          {},
        );

      state.productsInCart = Object.values(productsWithSupplier);
    });
  },
});

export const cartActions = sellerProfileSlice.actions;
export const { setProductsInCartPerPage, setSelectProduct, setSelectAllProducts } =
  cartActions;
export const sellerCartReducer = sellerProfileSlice.reducer;
