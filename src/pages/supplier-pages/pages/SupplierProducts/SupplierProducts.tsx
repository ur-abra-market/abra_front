import { HeaderSupplierProducts } from './HeaderSupplierProducts/HeaderSupplierProducts';
import { PaginationSettings } from './HeaderSupplierProducts/PaginationSettings/PaginationSettings';
import { ProductsList } from './ProductsList/ProductsList';
import style from './SupplierProducts.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';

export const SupplierProducts = WithLayout((): JSX.Element => {
  return (
    <section className={style.wrapper}>
      <div className={style.content_container}>
        <HeaderSupplierProducts />
        <PaginationSettings />
        <ProductsList />
        <PaginationSettings />
      </div>
    </section>
  );
}, 'supplier');
