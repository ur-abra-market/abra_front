import { ProductColor } from './ProductColor/ProductColor';
import { ProductSizeList } from './ProductSizeList/ProductSizeList';

import style from './ProductParams.module.scss';

export const ProductParams = (): JSX.Element => {
  return (
    <div className={style.params_container}>
      <ProductSizeList />
      <ProductColor colors={[]} />
    </div>
  );
};
