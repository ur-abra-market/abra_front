import { FC, ReactNode } from 'react';

interface ITableListCell<T> {
  columnName?: string;
  data: T;
  className: string;
}

export const TableListCell: FC<ITableListCell<ReactNode | string>> = ({
  columnName,
  data,
  className,
}) => {
  return (
    <td className={className} data-column={columnName}>
      {data}
    </td>
  );
};
