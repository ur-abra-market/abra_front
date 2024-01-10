import { ChangeEvent, FC } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  activeProductSelector,
  deactivatedProductSelector,
  isLoadingSelector,
  selectActiveProduct,
  selectDeactivatedProduct,
} from 'store/reducers/supplier/product';
import { Checkbox } from 'ui-kit';

interface ICheckboxCell {
  id: number;
  status: boolean;
}

export const CheckboxListCell: FC<ICheckboxCell> = ({ id, status }) => {
  const activeProduct = useAppSelector(activeProductSelector);
  const deactivatedProduct = useAppSelector(deactivatedProductSelector);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const onChangeChecked = (
    e: ChangeEvent<HTMLInputElement>,
    id: number,
    status: boolean,
  ): void => {
    if (status) {
      dispatch(selectActiveProduct(id));
    } else {
      dispatch(selectDeactivatedProduct(id));
    }
  };
  const checked = activeProduct.includes(id) || deactivatedProduct.includes(id);

  return (
    <Checkbox
      disabled={isLoading}
      checked={checked}
      variant="default"
      onChange={event => onChangeChecked(event, id, status)}
    />
  );
};
