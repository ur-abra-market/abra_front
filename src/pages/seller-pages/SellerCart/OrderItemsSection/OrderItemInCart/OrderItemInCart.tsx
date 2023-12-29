import React, { FC } from 'react';

import { PayloadAction } from '@reduxjs/toolkit';

import { ItemDescription } from './ItemDescription';

import { QuestionDisabled } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
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
  bundle_variation: IBundleVariations;
  prices: IPriceBundle[];
  amount: number;
  is_checked: boolean;
}

export const OrderItemInCart: FC<IOrderItemInCart> = ({
  product,
  bundle_variation,
  amount,
  prices,
  is_checked,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const onCheckedProductHandler = (
    id: number | null,
  ): PayloadAction<{
    id: number | null;
  }> => dispatch(setSelectProduct({ id }));

  const variationValues = bundle_variation.bundle.variation_values;

  const commonPiecesBundles =
    variationValues.reduce((item: number, variationValues: IVariationValues) => {
      return item + variationValues.amount;
    }, 0) * amount;

  return (
    <li className={style.order_list_item}>
      <Checkbox
        variant="default"
        checked={is_checked}
        onChange={() => onCheckedProductHandler(product.id)}
      />

      <div className={style.product_info}>
        <ItemDescription
          product={product}
          amount={amount}
          pieces={commonPiecesBundles}
          price={prices}
          bundle_variation_value={bundle_variation.product_variation.variation}
        />

        <div className={style.counter_wrapper}>
          <Counter
            bundles_amount={`/ from ${amount} bundles`}
            className={style.counter}
            amount={amount}
            max_amount={1000}
            onChange={() => {}}
          />
          <button type="button" className={style.button_question}>
            {' '}
            <QuestionDisabled />
          </button>
        </div>
      </div>
    </li>
  );
};
