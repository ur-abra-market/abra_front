import React from 'react';

import style from './ProductListSettings.module.scss';
import { SortBySetting } from './SortBySetting/SortBySetting';

import { useAppSelector } from 'common/hooks';
import { isLoadingSelector } from 'store/reducers/supplier/product';
import { Checkbox } from 'ui-kit';

export const ProductListSettings = (): JSX.Element => {
  const isLoading = useAppSelector(isLoadingSelector);
  // const dispatch = useAppDispatch();
  // const params = useAppSelector(getParamsSelector);
  // const onChangeHidden = (value: ChangeEvent<HTMLInputElement>): void => {
  //   dispatch(
  //     setParams({
  //       ...params,
  //       isActive: value.currentTarget.checked,
  //     }),
  //   );
  // };

  return (
    <div className={style.rest_filters_wrapper}>
      <SortBySetting />
      {/* <SaleStatusSetting /> */}
      <Checkbox
        disabled={isLoading}
        // onChange={onChangeHidden}
        // checked={params.isActive}
        label="Include Hidden"
        variant="notification"
        className={style.checkbox}
      />
    </div>
  );
};
