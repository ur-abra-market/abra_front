import React, { FC } from 'react';

import { PayloadAction } from '@reduxjs/toolkit';

import { ItemDescription } from './ItemDescription';

import { QuestionIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { useGetResponsiveWidth } from 'common/hooks/useGetResponsiveWidth';
import { IProductInCart, setSelectProduct } from 'store/reducers/seller/cart';
import {
  IBundleVariations,
  IPriceBundle,
  IVariationValues,
} from 'store/reducers/seller/cart/types';
import { Checkbox } from 'ui-kit';
import { Counter } from 'ui-kit/Counter/Counter';

import style from './OrderItemInCart.module.scss';

interface IOrderItemInCart {
  product: IProductInCart;
  bundleVariation: IBundleVariations;
  prices: IPriceBundle[];
  amount: number;
  isChecked: boolean;
  isCheckoutPage?: boolean;
}

const widthChangedVariantCounter = 861;

export const OrderItemInCart: FC<IOrderItemInCart> = ({
  product,
  bundleVariation,
  amount,
  prices,
  isChecked,
  isCheckoutPage,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const windowWidth = useGetResponsiveWidth();

  const variationValues = bundleVariation.bundle.variation_values;
  const bundleVariationValue = bundleVariation.product_variation.variation;
  const variationValueProductId = bundleVariation.variation_value_to_product_id;
  const counterVariant = windowWidth >= widthChangedVariantCounter ? 'small' : 'large';

  const commonPiecesBundles =
    variationValues.reduce((item: number, variationValues: IVariationValues) => {
      return item + variationValues.amount;
    }, 0) * amount;

  const handleCheckedProduct = (
    id: number,
  ): PayloadAction<{
    id: number | null;
  }> => dispatch(setSelectProduct({ id }));

  return (
    <li className={style.order_list_item}>
      <div className={style.product_info}>
        {!isCheckoutPage && (
          <Checkbox
            variant="default"
            checked={isChecked}
            onChange={() => handleCheckedProduct(variationValueProductId as number)}
          />
        )}

        <ItemDescription
          product={product}
          amount={amount}
          pieces={commonPiecesBundles}
          price={prices}
          bundleVariationValue={bundleVariationValue}
        />
      </div>

      <div className={style.counter_wrapper}>
        <Counter
          variant={counterVariant}
          bundles_amount={`/ from ${amount} bundles`}
          className={style.counter}
          amount={amount}
          max_amount={1000}
          onChange={() => {}}
        />

        <button
          type="button"
          aria-label="button-question"
          className={style.button_question}
        >
          <QuestionIcon />
        </button>
      </div>
    </li>
  );
};
