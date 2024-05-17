import React, { useCallback, useEffect } from 'react';

import CheckoutAndCartWithOrder from './CheckoutAndCartWithOrder/CheckoutAndCartWithOrder';
import { EmptyCart } from './EmptyCart';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getSellerCartData, totalItems } from 'store/reducers/seller/cart';
import { isLoading } from 'store/reducers/seller/cart/selectors';
import { LoaderLinear } from 'ui-kit';

import style from './SellerCart.module.scss';

export const SellerCartPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const cartIsLoading = useAppSelector(isLoading);
  const totalAmountItems = useAppSelector(totalItems);

  const getCartData = useCallback(async (): Promise<void> => {
    await dispatch(
      getSellerCartData({
        offset: 0,
        limit: 100,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    getCartData();
  }, [getCartData]);

  if (cartIsLoading) return <LoaderLinear />;

  return (
    <div className={style.wrapper}>
      {totalAmountItems ? <CheckoutAndCartWithOrder /> : <EmptyCart />}
    </div>
  );
});
