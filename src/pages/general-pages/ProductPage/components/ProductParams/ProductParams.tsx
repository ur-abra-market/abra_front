import { ProductColor } from './ProductColor/ProductColor';
import { ProductSizeList } from './ProductSizeList/ProductSizeList';

import { useAppSelector } from 'common/hooks';

import style from './ProductParams.module.scss';

interface IProductParams {
  setBundleVariationPodId: (value: number | null) => void;
}

export const ProductParams = ({
  setBundleVariationPodId,
}: IProductParams): JSX.Element => {
  const selectedBundle = useAppSelector(state => state.product.selectedBundle);

  return (
    <div className={style.params_container}>
      {selectedBundle.type === 'size' ? (
        <>
          <ProductColor bundleType={selectedBundle.type} bundle={selectedBundle.bundle} />
          <ProductSizeList
            bundleType={selectedBundle.type}
            bundle={selectedBundle.bundle}
            setBundleVariationPodId={setBundleVariationPodId}
          />
        </>
      ) : (
        <>
          <ProductSizeList
            bundleType={selectedBundle.type}
            bundle={selectedBundle.bundle}
          />
          <ProductColor
            bundleType={selectedBundle.type}
            bundle={selectedBundle.bundle}
            setBundleVariationPodId={setBundleVariationPodId}
          />
        </>
      )}
    </div>
  );
};
