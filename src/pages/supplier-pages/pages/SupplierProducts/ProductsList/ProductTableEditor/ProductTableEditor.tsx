import React from 'react';

import cn from 'classnames';

import style from './ProductTableEditor.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { productEditorData } from 'pages/supplier-pages/pages/SupplierProducts/utils/tableData';
import {
  activeProductSelector,
  deActivateProducts,
  getParamsSelector,
} from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

export const ProductTableEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeProduct = useAppSelector(activeProductSelector);
  const { isActive } = useAppSelector(getParamsSelector);

  const handleOnClick = (label: string): void => {
    switch (label) {
      case 'Delete':
        dispatch(deActivateProducts(activeProduct));
        break;
      default:
    }
  };

  return (
    <div className={style.container}>
      <div className={`${style.wrapper} ${style.gap}`}>
        {productEditorData.map(({ id, label, Icon }) => {
          const disabled = isActive && label === 'Recently deleted';

          const productEditorClasses = cn({
            [style.product_editor]: true,
            [style.in_active_edit]: activeProduct.length > 1 && label === 'Edit',
            [style.in_active]:
              !activeProduct.length &&
              label !== 'Add a new product' &&
              label !== 'Recently deleted',
            [style.disabled]: isActive && label === 'Recently deleted',
          });

          return (
            <ButtonIcon
              onClick={() => handleOnClick(label)}
              disabled={disabled}
              className={productEditorClasses}
              key={id}
            >
              <Icon />
              {label}
            </ButtonIcon>
          );
        })}
      </div>
    </div>
  );
};
