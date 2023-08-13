import React from 'react';

import style from './ProductListSettings.module.scss';
import { SortBySetting } from './SortBySetting/SortBySetting';

import { Checkbox } from 'ui-kit';

export const ProductListSettings = (): JSX.Element => {
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
      {/* <DateSetting /> */}
      <SortBySetting />
      {/* <SaleStatusSetting /> */}
      <Checkbox
        // onChange={onChangeHidden}
        // checked={params.isActive}
        label="Include Hidden"
        variant="notification"
        className={style.checkbox}
      />
    </div>
  );
};
