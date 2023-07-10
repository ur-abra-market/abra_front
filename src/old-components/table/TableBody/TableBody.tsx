import React, { FC } from 'react';

import _ from 'lodash';
import { Link } from 'react-router-dom';

import { LazyImage } from 'elements/LazyImage/LazyImage';
import { LoaderCircular } from 'ui-kit';

interface TableBodyProps {
  data: any[];
  classes: any;
  columns: any;
}
const TableBody: FC<TableBodyProps> = ({ data, columns, classes }): JSX.Element => {
  const renderCompont = (item: any, column: any): any => {
    if (columns[column].component) {
      const { component } = columns[column];

      // item.with_discount === 0 ?
      if (typeof component === 'function') return component(item);

      return component;
    }
    // если мы динамически передаем вложенные данные, то не можем получить к ним доступ
    // для этого используем lodash
    const fieldValue = columns[column].path;

    if (fieldValue === 'image_url') {
      return <LazyImage width={40} height={40} src={`${item.image_url}`} alt="img" />;
    }
    if (fieldValue === 'with_discount' && item.with_discount === 0) return 'Off-sale';

    if (fieldValue === 'with_discount' && item.with_discount === 1) return 'On-sale';

    if (fieldValue === 'is_active' && item.is_active === 0) return 'Hidden';

    if (fieldValue === 'is_active' && item.is_active === 1) return 'Visible';

    return _.get(item, columns[column].path);
  };

  return (
    <tbody>
      {/* eslint-disable-next-line no-nested-ternary */}
      {data ? (
        data.length === 0 ? (
          <tr>
            <td style={{ textAlign: 'center' }} colSpan={9}>
              Please, <Link to="../add-product">add product</Link>
            </td>
          </tr>
        ) : (
          data.map(item => (
            <tr key={item.id} className={classes.tableRow}>
              {Object.keys(columns).map(column => (
                // если мы динамически передаем вложенные данные, то не можем получить к ним доступ
                // для этого используем lodash
                <td
                  key={column.replace(/ /g, '')}
                  className={
                    item.status === 'Cancelled' || item.is_active === 0
                      ? classes.tableData_inactive
                      : classes.tableData
                  }
                >
                  {renderCompont(item, column)}
                </td>
              ))}
            </tr>
          ))
        )
      ) : (
        <LoaderCircular />
      )}
    </tbody>
  );
};

export default TableBody;
