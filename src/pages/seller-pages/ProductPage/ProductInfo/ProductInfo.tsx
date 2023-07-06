import { useAppSelector } from 'common/hooks';
import { ProductCarousel } from 'elements/ProductCarousel/ProductCarousel';
import { productImagesSelector } from 'store/reducers/productSliceNew';

export const ProductInfo = (): JSX.Element => {
  const images = useAppSelector(productImagesSelector);

  return (
    <div>
      <ProductCarousel photoArray={images} />
    </div>
  );
};
