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
} from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

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

  function shouldShowInActiveEdit(
    activeProduct: number[],
    deactivatedProduct: number[],
    label: string,
  ): boolean {
    const isActiveProductEmpty = activeProduct.length === 0;
    const isDeactivatedProductEmpty = deactivatedProduct.length === 0;

    if (label === 'Edit') {
      const hasSingleElementInArray =
        (activeProduct.length === 1 && deactivatedProduct.length === 0) ||
        (activeProduct.length === 0 && deactivatedProduct.length === 1);

      return !hasSingleElementInArray;
    }

    if (label === 'Activated product') {
      return !(isActiveProductEmpty && !isDeactivatedProductEmpty);
    }

    if (label === 'Deactivated product') {
      return !(isDeactivatedProductEmpty && !isActiveProductEmpty);
    }

    return false;
  }

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
