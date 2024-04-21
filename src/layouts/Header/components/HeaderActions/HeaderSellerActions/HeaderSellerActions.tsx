import React, { FC, useEffect, useState } from 'react';

import cn from 'classnames';

import {
  HeaderCartIcon,
  HeaderFavouritesIcon,
  HeaderNotificationsIcon,
  HeaderProfileIcon,
} from 'assets/icons';
import { useAppDispatch, useAppSelector, useOnClickOutside } from 'common/hooks';
import { HeaderMenu } from 'layouts/Header/components';
import { getSellerCartData, totalItems } from 'store/reducers/seller/cart';
import { ButtonIcon } from 'ui-kit';

import style from './HeaderSellerActions.module.scss';

interface IHeaderSellerActions {
  callBack: (target: string) => void;
}

export const HeaderSellerActions: FC<IHeaderSellerActions> = ({
  callBack,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const totalAmountItems = useAppSelector(totalItems);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const MAX_TOTAL_AMOUNT = 99;
  const amountItemsInCart =
    totalAmountItems > MAX_TOTAL_AMOUNT ? '99+' : totalAmountItems;

  const totalAmountClasses = cn(style.cart_items, [
    totalAmountItems > MAX_TOTAL_AMOUNT && style.big_order,
  ]);

  const handleMenuOpen = (value: boolean): void => {
    setMenuOpen(value);
  };

  const triggerRef = useOnClickOutside(handleMenuOpen, isMenuOpen);

  useEffect(() => {
    dispatch(getSellerCartData({}));
  }, [dispatch]);

  return (
    <>
      <div className={style.buttons_wrapper} ref={triggerRef}>
        <ButtonIcon onClick={() => handleMenuOpen(!isMenuOpen)}>
          <HeaderProfileIcon />
        </ButtonIcon>

        <HeaderMenu isMenuOpen={isMenuOpen} setMenuOpen={() => setMenuOpen(false)} />
      </div>

      <ButtonIcon onClick={() => callBack('note')}>
        <HeaderNotificationsIcon />
      </ButtonIcon>

      <ButtonIcon onClick={() => callBack('favorite')}>
        <HeaderFavouritesIcon />
      </ButtonIcon>

      <ButtonIcon onClick={() => callBack('cart')} className={style.cart_button}>
        <HeaderCartIcon />
        {!!totalAmountItems && (
          <div className={totalAmountClasses}>{amountItemsInCart}</div>
        )}
      </ButtonIcon>
    </>
  );
};
