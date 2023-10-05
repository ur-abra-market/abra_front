import { ProductDetails } from './ProductDetails/ProductDetails';

import { useAppSelector } from 'common/hooks';
import { ProductCarousel } from 'elements/ProductCarousel/ProductCarousel';
import { productImagesSelector } from 'store/reducers/productSlice';

import style from './ProductMainInfo.module.scss';

export const ProductMainInfo = (): JSX.Element => {
  const images = useAppSelector(productImagesSelector);

  return (
    <div className={style.main_info_container}>
      <ProductCarousel photoArray={images} />
      <ProductDetails />
    </div>
  );
};
