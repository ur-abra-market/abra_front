import React, { FC, useState } from 'react';

import {
  HeaderCartIcon,
  HeaderFavouritesIcon,
  HeaderNotificationsIcon,
  HeaderProfileIcon,
} from 'assets/icons';
import { useOnClickOutside } from 'common/hooks';
import { HeaderMenu } from 'layouts/Header/components';
import { ButtonIcon } from 'ui-kit';

import style from './HeaderSellerActions.module.scss';

interface IHeaderSellerActions {
  callBack: (target: string) => void;
}

export const HeaderSellerActions: FC<IHeaderSellerActions> = ({
  callBack,
}): JSX.Element => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = (value: boolean): void => {
    setMenuOpen(value);
  };

  const triggerRef = useOnClickOutside(handleMenuOpen, isMenuOpen);

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

      <ButtonIcon onClick={() => callBack('cart')}>
        <HeaderCartIcon />
      </ButtonIcon>
    </>
  );
};
