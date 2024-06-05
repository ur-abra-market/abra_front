import React, { createRef, FC, RefObject } from 'react';

import { useSetMaxWidthElementsInList } from 'common/hooks';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductColor } from 'ui-kit';

interface IBundleColorList {
  bundle: IProductBundle;
  handleSelectColorOrSize?: (id: number, quantity: number) => void;
  selectedId?: { id: number }[];
  isBundles?: boolean;
}

export const BundleColorList: FC<IBundleColorList> = ({
  bundle,
  isBundles,
  handleSelectColorOrSize,
  selectedId,
}): JSX.Element => {
  const buttonRefs: RefObject<HTMLDivElement>[] = Array.from(
    { length: bundle.variation_values.length },
    () => createRef<HTMLDivElement>(),
  );

  useSetMaxWidthElementsInList({ refs: buttonRefs });

  return (
    <>
      {bundle.variation_values.map((el, i) => (
        <ProductColor
          handleSelectColorOrSize={handleSelectColorOrSize}
          isBundles={isBundles}
          selectedId={selectedId}
          key={el.id}
          value={el.amount}
          colorName={el.product_variation.variation.value}
          imageUrl={el.product_variation.variation.image_url || ''}
          ref={buttonRefs[i]}
          colorId={el.id}
        />
      ))}
    </>
  );
};
