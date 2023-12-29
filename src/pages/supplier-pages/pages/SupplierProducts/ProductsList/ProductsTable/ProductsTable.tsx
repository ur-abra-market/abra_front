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
      <table className={style.fixed_table}>
        <TableHeader
          tableSortData={tableSortData}
          displayedColumns={['Checkbox', 'SKU']}
          isFixed
        />
        <TableList products={products} displayedColumns={['Checkbox', 'SKU']} isFixed />
      </table>
      <div className={style.shadow} />
      <div className={style.cover} />
      <table className={style.scrollable_table}>
        <TableHeader
          tableSortData={tableSortData}
          nonDisplayedColumns={['Checkbox', 'SKU']}
        />
        <TableList products={products} nonDisplayedColumns={['Checkbox', 'SKU']} />
      </table>
    </div>
  );
};
