import React from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { shouldShowInActiveEdit } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/shouldShowInActiveEdit';
import { productEditorData } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/tableData';
import { ADD_PRODUCT } from 'routes';
import {
  selectedProducts,
  selectedProductSelector,
  unselectedProductSelector,
  unselectedProducts,
} from 'store/reducers/supplier/product';
import { ButtonIcon } from 'ui-kit';

import style from './ProductTableEditor.module.scss';

export const ProductTableEditor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const selectedProductComponent = useAppSelector(selectedProductSelector);
  const unselectedProductComponent = useAppSelector(unselectedProductSelector);

  const navigate = useNavigate();

  const onHandleProductAction = (label: string): void => {
    switch (label) {
      case 'Deactivated product':
        dispatch(unselectedProducts(selectedProductComponent));
        break;
      case 'Activated product':
        dispatch(selectedProducts(unselectedProductComponent));
        break;
      default:
    }
    navigate(ADD_PRODUCT);
  };

  return (
    <div className={style.container}>
      <div className={`${style.wrapper} ${style.gap}`}>
        {productEditorData.map(({ id, label, Icon }) => {
          const isEditorDisabled = shouldShowInActiveEdit(
            selectedProductComponent,
            unselectedProductComponent,
            label,
          );

          const productEditorClasses = cn(style.product_editor, {
            [style.in_active_edit]: isEditorDisabled,
            [style.disabled]: isEditorDisabled,
          });

          return (
            <ButtonIcon
              onClick={() => onHandleProductAction(label)}
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
