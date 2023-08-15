import React, { ChangeEvent, FC } from 'react';

import cn from 'classnames';
import { useSelector } from 'react-redux';

import style from './TableList.module.scss';

import defaultImg from 'assets/images/files/default-product-image.png';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formatDate } from 'common/utils/formatDateProductsList';
import { ITableData } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsTable/ProductsTable';
import {
  getActivatedIds,
  getDeactivatedIds,
  isLoadingSelector,
  setProductStatus,
} from 'store/reducers/supplier/product';
import { Checkbox } from 'ui-kit';

export const TableList: FC<ITableData> = ({ data }): JSX.Element => {
  const deactivatedProductsIds = useSelector(getDeactivatedIds);
  const activatedProductsIds = useSelector(getActivatedIds);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const deactivatedArray = deactivatedProductsIds?.map(product => product.id);
  const activatedArray = activatedProductsIds?.map(product => product.id);
  const productsIdsArray = deactivatedArray.concat(activatedArray);

  const getProductId = (checked: boolean, id: number, status: boolean): void => {
    dispatch(setProductStatus({ checked, id, status }));
  };

  const onChangeChecked = (
    e: ChangeEvent<HTMLInputElement>,
    id: number,
    status: boolean,
  ): void => {
    getProductId(e.currentTarget.checked, id, status);
  };

  return (
    <tbody>
      {data?.map(el => {
        const checked = productsIdsArray?.includes(el.id);
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
                onChange={event => onChangeChecked(event, el.id, el.is_active)}
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
            <td className={style.table_td}>{el.is_active ? 'Visible' : 'Hidden'}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
