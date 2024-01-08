import { FC } from 'react';

import cn from 'classnames';

import { TableHeaderCell } from './TableHeaderComponents/TableHeaderCell';

import { IColumns } from 'pages/supplier-pages/pages/SupplierProducts/common/types/types';

import style from './TableHeader.module.scss';

interface ITableHeader {
  tableSortData: IColumns[];
  visibleColumns?: string[];
  hiddenColumns?: string[];
  className?: string;
}

export const TableHeader: FC<ITableHeader> = ({
  tableSortData,
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
    <thead className={style.thead}>
      <tr className={cn(style.table_row, className)}>
        {totalDisplayedColumns().map(column => (
          <TableHeaderCell key={column.id} column={column} className={style.table_head} />
        ))}
      </tr>
    </thead>
  );
};
