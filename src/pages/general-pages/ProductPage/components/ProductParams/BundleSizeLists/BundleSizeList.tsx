import { createRef, FC, RefObject } from 'react';

import { useSetMaxWidthElementsInList } from 'common/hooks';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductSize } from 'ui-kit';

interface IBundleSizeList {
  bundle: IProductBundle;
  handleSelectColorOrSize?: (id: number, quantity: number) => void;
  selectedId?: { id: number }[];
  isBundles?: boolean;
}

export const BundleSizeList: FC<IBundleSizeList> = ({
  bundle,
  handleSelectColorOrSize,
  selectedId,
  isBundles,
}): JSX.Element => {
  const buttonRefs: RefObject<HTMLDivElement>[] = Array.from(
    { length: bundle.variation_values.length },
    () => createRef<HTMLDivElement>(),
  );

  useSetMaxWidthElementsInList({ refs: buttonRefs });

  return (
    <>
      {bundle.variation_values.map((el, index) => (
        <ProductSize
          key={el.id}
          sizeId={el.id}
          size={el.product_variation.variation.value}
          quantity={el.amount}
          selectedId={selectedId}
          handleSelectColorOrSize={handleSelectColorOrSize}
          isBundles={isBundles}
          ref={buttonRefs[index]}
        />
      ))}
    </>
  );
};
