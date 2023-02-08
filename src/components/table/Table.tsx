import React, { FC, ReactNode } from 'react';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

interface TableProps {
  columns?: any;
  selectedSort?: any;
  onSort?: any;
  data: any[];
  classes?: any;
  children?: ReactNode;
}
const Table: FC<TableProps> = ({
  onSort,
  selectedSort,
  columns,
  data,
  children,
  classes,
}) => {
  return (
    <table className={classes.table}>
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns, classes }} />
          <TableBody {...{ data, columns, classes }} />
        </>
      )}
    </table>
  );
};

export default Table;
