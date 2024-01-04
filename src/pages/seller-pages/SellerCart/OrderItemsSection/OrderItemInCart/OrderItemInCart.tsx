import React, { FC, useEffect, useState } from 'react';

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

const widthChangedVariantCounter = 861;

export const OrderItemInCart: FC<IOrderItemInCart> = ({
  product,
  bundle_variation,
  amount,
  prices,
  is_checked,
}): JSX.Element => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dispatch = useAppDispatch();

  const variationValues = bundle_variation.bundle.variation_values;
  const bundleVariationValue = bundle_variation.product_variation.variation;

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
        <Checkbox
          variant="default"
          checked={is_checked}
          onChange={() => handleCheckedProduct(product.id as number)}
        />

        <ItemDescription
          product={product}
          amount={amount}
          pieces={commonPiecesBundles}
          price={prices}
          bundle_variation_value={bundleVariationValue}
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
          <QuestionDisabled />
        </button>
      </div>
    </li>
  );
};
