import React from 'react';

import { Title } from 'ui-kit';

import style from './EmptyCart.module.scss';

export const EmptyCart = (): JSX.Element => {
  return (
    <div className={style.empty_cart}>
      <Title as="h1" weight="bold" size="s">
        Unfortunately, your shopping cart is empty.
      </Title>
      <Title as="h1" weight="bold" size="s">
        As soon as you place items in cart it will appear here
      </Title>
    </div>
  );
};
