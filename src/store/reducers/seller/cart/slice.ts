import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getSellerCartData } from './thunks';
import { IProductCardInCart } from './types';

export interface IProductsInCart {
  productsPerPage: number;
  productsInCart: Array<IProductCardInCart[]>;
  totalProductForOrder: number;
  totalAmountBundles: number;
  totalItems: number;
}

const initialState: IProductsInCart = {
  productsPerPage: 20,
  productsInCart: [],
  totalProductForOrder: 0,
  totalAmountBundles: 0,
  totalItems: 0,
};
const sellerCartSlice = createSlice({
  name: 'seller/cart',
  initialState,
  reducers: {
    setProductsInCartPerPage: (state, action: PayloadAction<number>) => {
      state.productsPerPage = action.payload;
    },
    setSelectProduct: (state, action: PayloadAction<{ id: number | null }>) => {
      const product = state.productsInCart
        .flat()
        .find(
          item =>
            item.bundle_variation_pod.bundle_variations[0]
              .variation_value_to_product_id === action.payload.id,
        );

      if (product) {
        product.isChecked = !product.isChecked;
      }
    },
    setSelectAllProducts: (
      state,
      action: PayloadAction<{
        isChecked: boolean;
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
            return { ...product, isChecked: action.payload.isChecked };
          });
        }

        return item;
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(getSellerCartData.fulfilled, (state, action) => {
      const productCartItems: IProductCardInCart[] = [];

      action.payload.forEach(item => {
        productCartItems.push(...item.details);
      });

      const productsWithSupplier: Record<string, IProductCardInCart[]> =
        productCartItems.reduce(
          (
            products_with_name: Record<string, IProductCardInCart[]>,
            products: IProductCardInCart,
          ) => {
            const supplierName =
              products.bundle_variation_pod.product.supplier.company.name;

            return {
              ...products_with_name,
              [supplierName]: [
                ...(products_with_name[supplierName] || []),
                {
                  ...products,
                  isChecked: true,
                },
              ],
            };
          },
          {},
        );

      const sortedCartItemsByName: Record<string, IProductCardInCart[]> =
        Object.fromEntries(Object.entries(productsWithSupplier).sort());

      state.productsInCart = Object.values(sortedCartItemsByName);
      state.totalItems = state.productsInCart.flat(2).length;
    });
  },
});

export const cartActions = sellerCartSlice.actions;
export const { setProductsInCartPerPage, setSelectProduct, setSelectAllProducts } =
  cartActions;
export const sellerCartReducer = sellerCartSlice.reducer;
