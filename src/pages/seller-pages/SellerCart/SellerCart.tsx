import React, { useEffect, useState } from 'react';

import { CartWithOrder } from './CartWithOrder/CartWithOrder';
import { EmptyCart } from './EmptyCart';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getSellerCartData, totalItems } from 'store/reducers/seller/cart';
import { LoaderLinear } from 'ui-kit';

import style from './SellerCart.module.scss';

export const SellerCartPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isFetchingData, setIsFetchingData] = useState(true);

  const totalAmountItems = useAppSelector(totalItems);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await dispatch(
        getSellerCartData({
          offset: 0,
          limit: 100,
        }),
      );
      setIsFetchingData(false);
    };

    fetchData();
  }, [dispatch]);

  if (isFetchingData) return <LoaderLinear />;

  return (
    <div className={style.wrapper}>
      {totalAmountItems ? <CartWithOrder /> : <EmptyCart />}
    </div>
  );
});
