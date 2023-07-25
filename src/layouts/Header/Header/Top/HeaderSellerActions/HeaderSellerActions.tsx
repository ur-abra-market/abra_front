import React, { FC, useState } from 'react';

import style from './HeaderSellerActions.module.scss';

import {
  HeaderCartIcon,
  HeaderFavouritesIcon,
  HeaderNotificationsIcon,
  HeaderProfileIcon,
} from 'assets/icons';
import { useOnClickOutside } from 'common/hooks';
import { HeaderMenu } from 'elements';
import { ButtonIcon } from 'ui-kit';

interface IHeaderSellerActionsProps {
  callBack: (target: string) => void;
}

export const HeaderSellerActions: FC<IHeaderSellerActionsProps> = ({
  callBack,
}): JSX.Element => {
  const [active, setActive] = useState(false);

  const handleMenuOpen = (value: boolean): void => {
    setActive(value);
  };

  const triggerRef = useOnClickOutside(handleMenuOpen);

  return (
    <>
      <div className={style.wrapper_button} ref={triggerRef}>
        <ButtonIcon onClick={() => handleMenuOpen(!active)}>
          <HeaderProfileIcon />
        </ButtonIcon>

        <HeaderMenu active={active} setActive={() => setActive(false)} />
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
