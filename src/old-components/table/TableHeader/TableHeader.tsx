import { FC } from 'react';

import style from './TableHeader.module.scss';

import { SortArrowDownIcon, SortArrowUpIcon } from 'assets/icons';

interface TableHeaderProps {
  columns: any[];
  selectedSort: any;
  onSort: any;
  classes?: any;
}
const TableHeader: FC<TableHeaderProps> = ({
  onSort,
  selectedSort,
  columns,
  classes,
}): JSX.Element => {
  const handleSort = (item: any): any => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        direction: selectedSort.direction === 'asc' ? 'desc' : 'asc',
      });
    } else onSort({ path: item, order: 'asc' });
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map(column => (
          <th
            key={column}
            className={classes.tableHeader}
            onClick={
              // @ts-ignore
              columns[column].path ? () => handleSort(columns[+column].path) : undefined
            }
            // @ts-ignore
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            {
              // @ts-ignore
              columns[column].name
            }

            {
              // @ts-ignore
              !(columns[column].name === 'Detail') && columns[column].path && (
                <span className={style.arrow_wrapper}>
                  <SortArrowUpIcon />
                  <SortArrowDownIcon />
                </span>
              )
            }
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
