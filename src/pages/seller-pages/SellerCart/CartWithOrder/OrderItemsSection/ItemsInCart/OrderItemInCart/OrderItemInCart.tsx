import { FC, useEffect, useState } from 'react';

import { PayloadAction } from '@reduxjs/toolkit';

import { ItemDescription } from './ItemDescription';

import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks';
import { useGetResponsiveWidth } from 'common/hooks/useGetResponsiveWidth';
import {
  IProductInCart,
  productsInCart,
  setSelectProduct,
} from 'store/reducers/seller/cart';
import { setAmountOfProduct } from 'store/reducers/seller/cart/thunks';
import {
  IBundleVariations,
  IPriceBundle,
  IVariationValues,
} from 'store/reducers/seller/cart/types';
import { Checkbox, LoaderLinear } from 'ui-kit';
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
  const productsCart = useAppSelector(productsInCart);
  const [productAmount, setProductAmount] = useState<number>(amount);
  const debouncedAmount = useDebounce(productAmount);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const variationValues = bundleVariation.bundle.variation_values;
  const bundleVariationValue = bundleVariation.product_variation.variation;
  const variationValueProductId = bundleVariation.variation_value_to_product_id;
  const counterVariant = windowWidth >= widthChangedVariantCounter ? 'small' : 'large';

  const commonPiecesBundles =
    variationValues.reduce((item: number, variationValues: IVariationValues) => {
      return item + variationValues.amount;
    }, 0) * amount;

  const orderId = productsCart
    .flat()
    .filter(
      el => el.bundle_variation_pod_id === bundleVariation.bundle_variation_pod_id,
    )[0].order_id;

  const handleCheckedProduct = (
    id: number,
  ): PayloadAction<{
    id: number | null;
  }> => dispatch(setSelectProduct({ id }));

  const handleChangeAmount = (amount: number | string): void => {
    setProductAmount(Number(amount));
  };

  const fetchAmount = async (): Promise<void> => {
    setIsLoading(true);
    await dispatch(
      setAmountOfProduct({
        orderId: orderId as number,
        productId: product.id as number,
        bundle_variation_pod_id: bundleVariation.bundle_variation_pod_id as number,
        amount: debouncedAmount,
      }),
    );
    setIsLoading(false);
  };

  useEffect(() => {
    if (isMounted) {
      fetchAmount();
    }
    setIsMounted(true);
  }, [debouncedAmount]);

  return (
    <li className={style.order_list_item}>
      {isLoading && <LoaderLinear />}
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
          amount={debouncedAmount}
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
          amount={productAmount}
          max_amount={1000}
          onChange={handleChangeAmount}
          withQuestionIcon
        />
      </div>
    </li>
  );
};
