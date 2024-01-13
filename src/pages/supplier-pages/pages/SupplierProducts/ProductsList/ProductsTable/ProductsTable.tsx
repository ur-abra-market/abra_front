import { TableHeader } from './TableHeader/TableHeader';
import { TableList } from './TableList/TableList';

import { useAppSelector } from 'common/hooks';
import { tableSortData } from 'pages/supplier-pages/pages/SupplierProducts/common/utils/tableData';
import { sortedProductSelector } from 'store/reducers/supplier/product';

import style from './ProductsTable.module.scss';

export const ProductsTable = (): JSX.Element => {
  const products = useAppSelector(sortedProductSelector);

  return (
    <div className={style.table_wrapper}>
      <table className={style.table_fixed}>
        <TableHeader
          tableSortData={tableSortData}
          visibleColumns={['Checkbox', 'SKU']}
          className={style.fixed}
        />

        <TableList
          products={products}
          visibleColumns={['Checkbox', 'SKU']}
          className={style.fixed}
        />
      </table>

      <div className={style.table_column_shadow} />
      <div className={style.table_column_shadow_cover} />

      <table className={style.table_scrollable}>
        <TableHeader tableSortData={tableSortData} hiddenColumns={['Checkbox', 'SKU']} />

        <TableList products={products} hiddenColumns={['Checkbox', 'SKU']} />
      </table>
    </div>
  );
};
