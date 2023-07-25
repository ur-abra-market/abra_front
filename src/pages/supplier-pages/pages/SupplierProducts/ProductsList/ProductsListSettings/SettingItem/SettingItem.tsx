import React from 'react';

import cn from 'classnames';

import style from './SettingItem.module.scss';

import { ISettingItem } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';

export const SettingItem: React.FC<ISettingItem> = ({
  classname,
  text,
  Icon,
  onClick,
  disabled,
}): JSX.Element => {
  const actionButtonClasses = cn(style.icon, {
    [style.disabled]: disabled === true,
  });
  const filterButtonClasses = cn(classname, {
    [style.disabled]: disabled === true,
  });

  return (
    <div className={style.inner}>
      {Icon && (
        <button
          type="button"
          className={actionButtonClasses}
          onClick={onClick}
          disabled={disabled}
        >
          <Icon />
        </button>
      )}
      <button
        type="button"
        className={filterButtonClasses}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};
