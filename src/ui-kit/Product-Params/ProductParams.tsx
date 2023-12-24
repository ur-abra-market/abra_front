import { ProductColor } from './ProductColor/ProductColor';
import { ProductSize } from './ProductSize/ProductSize';

import style from './ProductParams.module.scss';

export const ProductParams = (): JSX.Element => {
  return (
    <div className={style.params_container}>
      <ProductSize />
      <ProductColor colors={[]} />
    </div>
  );
};
