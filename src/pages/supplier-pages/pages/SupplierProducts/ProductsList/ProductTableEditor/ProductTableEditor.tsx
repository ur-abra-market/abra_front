import React from 'react';

import cn from 'classnames';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { shouldShowInActiveEdit } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/shouldShowInActiveEdit';
import { productEditorData } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/tableData';
import {
  activateProducts,
  activeProductSelector,
  deactivatedProductSelector,
  deActivateProducts,
} from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

import style from './ProductTableEditor.module.scss';

export const ProductTableEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeProduct = useAppSelector(activeProductSelector);
  const deactivatedProduct = useAppSelector(deactivatedProductSelector);

  const onClickHandler = (label: string): void => {
    switch (label) {
      case 'Deactivated product':
        dispatch(deActivateProducts(activeProduct));
        break;
      case 'Activated product':
        dispatch(activateProducts(deactivatedProduct));
        break;
      default:
    }
  };

  return (
    <div className={style.container}>
      <div className={`${style.wrapper} ${style.gap}`}>
        {productEditorData.map(({ id, label, Icon }) => {
          const isEditorDisabled = shouldShowInActiveEdit(
            activeProduct,
            deactivatedProduct,
            label,
          );

          const productEditorClasses = cn(style.product_editor, {
            [style.in_active_edit]: isEditorDisabled,
            [style.disabled]: isEditorDisabled,
          });

          return (
            <ButtonIcon
              onClick={() => onClickHandler(label)}
              disabled={isEditorDisabled}
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
