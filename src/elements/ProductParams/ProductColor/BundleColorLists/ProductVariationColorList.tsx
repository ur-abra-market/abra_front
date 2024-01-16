import React, { createRef, FC, RefObject } from 'react';

import { useSetMaxWidthElementsInList } from 'common/hooks';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductColorLocked } from 'ui-kit';

interface IProductVariationColorList {
  bundle: IProductBundle;
}

export const ProductVariationColorList: FC<IProductVariationColorList> = ({
  bundle,
}): JSX.Element => {
  const buttonRefs: RefObject<HTMLButtonElement>[] = Array.from(
    { length: bundle.variation_values.length },
    () => createRef<HTMLButtonElement>(),
  );

  useSetMaxWidthElementsInList({ refs: buttonRefs });

  return (
    <>
      {bundle.variation_values.map((el, i) => (
        <ProductColorLocked
          key={el.id}
          value={el.amount}
          imageUrl={el.product_variation.variation.image_url || ''}
          ref={buttonRefs[i]}
        />
      ))}
    </>
  );
};
