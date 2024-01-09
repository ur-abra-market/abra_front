import { ChangeEvent, FC, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  selectAllProductsSelector,
  isLoadingSelector,
  selectAllProducts,
  activeProductSelector,
  deactivatedProductSelector,
  productsSelector,
} from 'store/reducers/supplier/product';
import { Checkbox } from 'ui-kit';

interface ICheckboxCell {
  className: string;
}

export const CheckboxHeaderCell: FC<ICheckboxCell> = ({ className }) => {
  const dispatch = useAppDispatch();
  const activeProduct = useAppSelector(activeProductSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const deactivatedProduct = useAppSelector(deactivatedProductSelector);
  const products = useAppSelector(productsSelector);

  const allProductsAreHandled = products.length
    ? products.every(
        pr => activeProduct.includes(pr.id) || deactivatedProduct.includes(pr.id),
      )
    : false;

  const checked = useSelector(selectAllProductsSelector) || allProductsAreHandled;

  const setAllCheckboxesState = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      dispatch(selectAllProducts(e.currentTarget.checked));
    },
    [dispatch],
  );

  return (
    <th aria-label="Checkbox" className={className} data-column="Checkbox">
      <Checkbox
        disabled={isLoading}
        variant="default"
        checked={checked}
        onChange={setAllCheckboxesState}
      />
    </th>
  );
};
