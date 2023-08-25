import React from 'react';

import cn from 'classnames';

import style from './ProductTableEditor.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { productEditorData } from 'pages/supplier-pages/pages/SupplierProducts/utils/tableData';
import {
  activateProducts,
  activeProductSelector,
  deactivatedProductSelector,
  deActivateProducts,
  getParamsSelector,
} from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

export const ProductTableEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeProduct = useAppSelector(activeProductSelector);
  const deactivatedProduct = useAppSelector(deactivatedProductSelector);
  const { isActive } = useAppSelector(getParamsSelector);

  const onClickHandler = (label: string): void => {
    switch (label) {
      case 'Delete':
        dispatch(deActivateProducts(activeProduct));
        break;
      case 'Recently deleted':
        dispatch(activateProducts(deactivatedProduct));
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
              onClick={() => onClickHandler(label)}
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
