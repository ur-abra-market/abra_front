import { ChangeEvent, FC } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  selectedProductSelector,
  unselectedProductSelector,
  isLoadingSelector,
  selectSelectedProduct,
  selectUnselectedProduct,
} from 'store/reducers/supplier/product';
import { Checkbox } from 'ui-kit';

interface ICheckboxCell {
  id: number;
  status: boolean;
}

export const CheckboxListCell: FC<ICheckboxCell> = ({ id, status }) => {
  const selectedProduct = useAppSelector(selectedProductSelector);
  const unselectedProduct = useAppSelector(unselectedProductSelector);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const onChangeChecked = (
    e: ChangeEvent<HTMLInputElement>,
    id: number,
    status: boolean,
  ): void => {
    if (status) {
      dispatch(selectSelectedProduct(id));
    } else {
      dispatch(selectUnselectedProduct(id));
    }
  };
  const checked = selectedProduct.includes(id) || unselectedProduct.includes(id);

  return (
    <Checkbox
      disabled={isLoading}
      checked={checked}
      variant="default"
      onChange={event => onChangeChecked(event, id, status)}
    />
  );
};
