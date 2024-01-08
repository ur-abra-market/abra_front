import { FC, ReactNode } from 'react';

import cn from 'classnames';

import { CheckboxListCell } from './TableListComponents/CheckboxListCell';
import { DateTimeContainer } from './TableListComponents/DateTimeContainer';
import { TableListCell } from './TableListComponents/TableListCell';

import defaultImg from 'assets/images/files/default-product-image.png';
import { IColumns } from 'pages/supplier-pages/pages/SupplierProducts/common/types/types';
import { tableSortData } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/tableData';
import { IProduct } from 'store/reducers/supplier/product';
import { Stars } from 'ui-kit';

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
  const totalDisplayedColumns = (): IColumns[] => {
    if (visibleColumns) {
      return tableSortData.filter(({ name }) => visibleColumns.includes(name));
    }

    return tableSortData.filter(({ name }) => !hiddenColumns!.includes(name));
  };

  return (
    <tbody>
      {products?.map(
        ({ id, name, created_at, prices, grade_average, is_active }: IProduct) => {
          const deactivatedClasses = cn(style.table_row, {
            [style.table_deactivated]: !is_active,
          });

          const content = (columnName: string): ReactNode | string => {
            const [price] = prices;

            const columnsContent: { [key: string]: ReactNode | string } = {
              // data
              SKU: id,
              Name: name,
              Status: price.discount ? 'On Sale' : 'Off Sale',
              Price: `$${price.value}`,
              Units: 'empty',
              Visibility: is_active ? 'Visible' : 'Hidden',
              // ReactNodes
              Checkbox: <CheckboxListCell id={id} status={is_active} />,
              Picture: <img className={style.image} src={defaultImg} alt="product" />,
              'Creation Date': (
                <DateTimeContainer
                  className={style.datetime_container}
                  created_at={created_at}
                />
              ),
              Rating: <Stars sizes="10" reward={grade_average} />,
            };

            return columnsContent[columnName] ?? 'Not found';
          };

          return (
            <tr className={cn(deactivatedClasses, style.table_row, className)} key={id}>
              {totalDisplayedColumns().map(({ id, name }: IColumns) => {
                return (
                  <TableListCell
                    key={id}
                    columnName={name}
                    data={content(name)}
                    className={style.table_td}
                  />
                );
              })}
            </tr>
          );
        },
      )}
    </tbody>
  );
};
