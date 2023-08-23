import { ProductList } from './ProductList/ProductList';
import style from './ProductListPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';

export const ProductListPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.product_list_page}>
      <ProductList />
    </div>
  );
});
