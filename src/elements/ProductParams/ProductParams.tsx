import { ProductColor } from './ProductColor/ProductColor';
import { ProductSizeList } from './ProductSizeList/ProductSizeList';

import { useAppSelector } from 'common/hooks';

import style from './ProductParams.module.scss';

export const ProductParams = (): JSX.Element => {
  const activeBundle = useAppSelector(state => state.product.activeBundle);

  return (
    <div className={style.params_container}>
      {activeBundle.type === 'size' ? (
        <>
          <ProductColor bundleType={activeBundle.type} bundle={activeBundle.bundle} />
          <ProductSizeList bundleType={activeBundle.type} bundle={activeBundle.bundle} />
        </>
      ) : (
        <>
          <ProductSizeList bundleType={activeBundle.type} bundle={activeBundle.bundle} />
          <ProductColor bundleType={activeBundle.type} bundle={activeBundle.bundle} />
        </>
      )}
    </div>
  );
};
