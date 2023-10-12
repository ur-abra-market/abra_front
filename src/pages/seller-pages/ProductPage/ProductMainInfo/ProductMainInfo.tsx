import { ProductDetails } from './ProductDetails/ProductDetails';

import { useAppSelector } from 'common/hooks';
import { ProductCarousel } from 'elements/ProductCarousel/ProductCarousel';
import { productImagesSelector } from 'store/reducers/productSlice';

export const ProductMainInfo = (): JSX.Element => {
  const images = useAppSelector(productImagesSelector);

  return (
    <>
      <ProductCarousel photoArray={images} />
      <ProductDetails />
    </>
  );
};
