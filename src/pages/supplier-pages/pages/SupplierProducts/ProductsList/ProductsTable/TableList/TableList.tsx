import { ChangeEvent, FC } from 'react';

import cn from 'classnames';

import defaultImg from 'assets/images/files/default-product-image.png';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { formatDate } from 'common/utils/formatDateProductsList';
import {
  IProduct,
  activeProductSelector,
  deactivatedProductSelector,
  isLoadingSelector,
  selectActiveProduct,
  selectDeactivatedProduct,
} from 'store/reducers/supplier/product';
import { Checkbox, Stars } from 'ui-kit';

import style from './TableList.module.scss';

interface ITableList {
  products: IProduct[];
  visibleColumns?: string[];
  hiddenColumns?: string[];
  className?: string;
}

export const TableList: FC<ITableList> = ({
  products,
  visibleColumns,
  hiddenColumns,
  className = '',
}) => {
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

  const isColumnDisplayed = (name: string): boolean => {
    if (visibleColumns) {
      return visibleColumns.some(item => item === name);
    }

    return !hiddenColumns!.some(item => item === name);
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
          <tr className={cn(deactivatedClasses, style.table_row, className)} key={el.id}>
            {isColumnDisplayed('Checkbox') && (
              <td aria-label="Checkbox" className={style.table_td} data-column="Checkbox">
                <Checkbox
                  disabled={isLoading}
                  checked={checked}
                  variant="default"
                  onChange={event => onChangeChecked(event, el.id, el.is_active)}
                />
              </td>
            )}
            {isColumnDisplayed('SKU') && (
              <td className={style.table_td} data-column="SKU">
                {el.id}
              </td>
            )}
            {isColumnDisplayed('Picture') && (
              <td className={style.table_td} data-column="Picture">
                <img className={style.image} src={defaultImg} alt="product" />
              </td>
            )}
            {isColumnDisplayed('Name') && (
              <td className={style.table_td} data-column="Name">
                {el.name}
              </td>
            )}
            {isColumnDisplayed('Creation Date') && (
              <td className={style.table_td} data-column="Creation Date">
                {el.created_at && (
                  <div className={style.datetime_container}>
                    <span>{formattedDate}</span>
                    <span>{`${formattedTime} ${formattedTimeAMPM.toLowerCase()}`}</span>
                  </div>
                )}
              </td>
            )}

            {el.prices.map(item => (
              <>
                {isColumnDisplayed('Status') && (
                  <td className={style.table_td} data-column="Status">
                    {item.discount ? 'On Sale' : 'Off Sale'}
                  </td>
                )}
                {isColumnDisplayed('Price') && (
                  <td
                    className={style.table_td}
                    data-column="Price"
                  >{`$${item.value}`}</td>
                )}
                {isColumnDisplayed('Units') && (
                  <td className={style.table_td} data-column="Units">
                    empty
                  </td>
                )}
              </>
            ))}
            {isColumnDisplayed('Rating') && (
              <td aria-label="Stars" className={style.table_td} data-column="Rating">
                <Stars sizes="10" reward={el.grade_average} />
              </td>
            )}
            {isColumnDisplayed('Visibility') && (
              <td className={style.table_td} data-column="Visibility">
                {el.is_active ? 'Visible' : 'Hidden'}
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};
