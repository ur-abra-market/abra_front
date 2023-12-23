import React, { ChangeEvent } from 'react';

import cn from 'classnames';

import defaultImg from 'assets/images/files/default-product-image.png';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formatDate } from 'common/utils/formatDateProductsList';
import { tableSortData } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/tableData';
import {
  activeProductSelector,
  deactivatedProductSelector,
  isLoadingSelector,
  selectActiveProduct,
  selectDeactivatedProduct,
  sortedProductSelector,
} from 'store/reducers/supplier/product';
import { Checkbox, Stars } from 'ui-kit';

import style from './TableList.module.scss';

export const TableList = (): JSX.Element => {
  const products = useAppSelector(sortedProductSelector);
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

  return (
    <tbody>
      {products?.map(el => {
        const checked =
          activeProduct.includes(el.id) || deactivatedProduct.includes(el.id);
        const deactivatedClasses = cn(style.table_row, {
          [style.table_deactivated]: !el.is_active,
        });

        const formattedDateTime = formatDate(el.created_at);
        const [formattedDate, formattedTime, formattedTimeAMPM] =
          formattedDateTime.split(' ');

        return (
          <tr className={deactivatedClasses} key={el.id}>
            <td className={style.table_td} data-column="Checkbox">
              <Checkbox
                disabled={isLoading}
                checked={checked}
                variant="default"
                onChange={event => onChangeChecked(event, el.id, el.is_active)}
              />
            </td>
            <td className={style.table_td} data-column={tableSortData[0].name}>
              {el.id}
            </td>
            <td className={style.table_td} data-column={tableSortData[1].name}>
              <img className={style.image} src={defaultImg} alt="product" />
            </td>
            <td className={style.table_td} data-column={tableSortData[2].name}>
              {el.name}
            </td>
            <td className={style.table_td} data-column={tableSortData[3].name}>
              {el.created_at && (
                <div className={style.datetime_container}>
                  <span>{formattedDate}</span>
                  <span>{`${formattedTime} ${formattedTimeAMPM.toLowerCase()}`}</span>
                </div>
              )}
            </td>

            {el.prices.map(item => (
              <React.Fragment key={item.id}>
                <td className={style.table_td} data-column={tableSortData[4].name}>
                  {item.discount ? 'On Sale' : 'Off Sale'}
                </td>
                <td
                  className={style.table_td}
                  data-column={tableSortData[5].name}
                >{`$${item.value}`}</td>
                <td className={style.table_td} data-column={tableSortData[6].name}>
                  empty
                </td>
              </React.Fragment>
            ))}
            <td className={style.table_td} data-column={tableSortData[7].name}>
              <Stars sizes="10" reward={el.grade_average} />
            </td>
            <td className={style.table_td} data-column={tableSortData[8].name}>
              {el.is_active ? 'Visible' : 'Hidden'}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
