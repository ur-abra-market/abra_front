import React from 'react';

import style from './SettingItem.module.scss';

import { ISettingItemProps } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';

export const SettingItem: React.FC<ISettingItemProps> = ({
  classname,
  text,
  Icon,
  onClick,
}): JSX.Element => {
  return (
    <div className={style.inner}>
      {Icon && (
        <div className={style.icon}>
          <Icon />
        </div>
      )}
      <span className={classname} onClick={onClick} role="presentation">
        {text}
      </span>
    </div>
  );
};
