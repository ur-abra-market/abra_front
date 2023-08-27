import React, { ChangeEvent, FC } from 'react';

import cn from 'classnames';

import style from './TableList.module.scss';

import defaultImg from 'assets/images/files/default-product-image.png';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formatDate } from 'common/utils/formatDateProductsList';
import {
  activeProductSelector,
  IProduct,
  isLoadingSelector,
  selectActiveProduct,
} from 'store/reducers/supplier/product';
import { Checkbox, Stars } from 'ui-kit';

export interface ITableData {
  data: IProduct[] | undefined;
}

export const TableList: FC<ITableData> = ({ data }): JSX.Element => {
  const activeProduct = useAppSelector(activeProductSelector);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, id: number): void => {
    dispatch(selectActiveProduct(id));
  };

  const tableCellClasses = cn({
    [style.table_td]: true,
    [style.center]: true,
  });

  return (
    <tbody>
      {data?.map(el => {
        const checked = activeProduct.includes(el.id);
        const deactivatedClasses = cn(style.table_row, {
          [style.table_deactivated]: !el.is_active,
        });

        const formattedDateTime = formatDate(el.datetime);
        const [formattedDate, formattedTime] = formattedDateTime.split(' ');

        return (
          <tr className={deactivatedClasses} key={el.id}>
            <td className={style.table_td}>
              <Checkbox
                disabled={isLoading}
                checked={checked}
                variant="default"
                onChange={event => handleCheckboxChange(event, el.id)}
              />
            </td>
            <td className={style.table_td}>{el.id}</td>
            <td className={style.table_td}>
              <img className={style.image} src={defaultImg} alt="product" />
            </td>
            <td className={style.table_td}>{el.name}</td>
            <td className={style.table_td}>
              {el.datetime && (
                <div className={style.datetime_container}>
                  <span>{formattedDate}</span>
                  <span className={style.formatted_time}>{formattedTime}</span>
                </div>
              )}
            </td>

            {el.prices.map(item => (
              <React.Fragment key={item.id}>
                <td className={style.table_td}>
                  {item.discount ? 'On Sale' : 'Off Sale'}
                </td>
                <td className={style.table_td}>{`$${item.value}`}</td>
                <td className={style.table_td}>empty</td>
              </React.Fragment>
            ))}
            <td className={style.table_td}>
              <Stars sizes="14" reward={el.grade_average} />
            </td>
            <td className={tableCellClasses}>{el.is_active ? 'Visible' : 'Hidden'}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
