import React, {ForwardedRef, forwardRef} from 'react';
import {CategoriesMenuProps} from './CategoriesMenu.props';
import cn from 'classnames';
import style from './CategoriesMenu.module.css';

export const CategoriesMenu = forwardRef(
  (props: CategoriesMenuProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { className, ...restProps } = props;

    return (
      <nav ref={ref}>
        <ul className={cn(style.menu_container)}>
          <li>All categories</li>
          <li>Clothes</li>
          <li>Accessories</li>
          <li>Cosmetics and Self Care</li>
        </ul>
      </nav>
    );
  },
);
