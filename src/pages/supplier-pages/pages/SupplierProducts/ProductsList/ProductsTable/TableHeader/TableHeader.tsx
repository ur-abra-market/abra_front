import React from 'react';

import style from './TableHeader.module.scss';

import { ArrowSort } from 'assets/icons';
import { Checkbox } from 'ui-kit';

const columns = [
  { id: 1, name: <Checkbox variant="default" /> },
  { id: 2, name: 'SKU', arrow: <ArrowSort /> },
  { id: 3, name: 'Picture' },
  { id: 4, name: 'Name' },
  { id: 5, name: 'Creation Date', arrow: <ArrowSort /> },
  { id: 6, name: 'Status', arrow: <ArrowSort /> },
  { id: 7, name: 'Price', arrow: <ArrowSort /> },
  { id: 8, name: 'Balance, units', arrow: <ArrowSort /> },
  { id: 9, name: 'Visibility' },
];

export const TableHeader = (): JSX.Element => {
  return (
    <thead>
      <tr className={style.table_row}>
        {columns.map(column => (
          <th key={column.id} className={style.table_head}>
            {column.name}
            {column.arrow && column.arrow}
          </th>
        ))}
      </tr>
    </thead>
  );
};
