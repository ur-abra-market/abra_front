import React, { createRef, FC, RefObject } from 'react';

import { useSetMaxWidthElementsInList } from 'common/hooks';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductColor } from 'ui-kit';

interface IBundleColorList {
  bundle: IProductBundle;
}

export const BundleColorList: FC<IBundleColorList> = ({ bundle }): JSX.Element => {
  const buttonRefs: RefObject<HTMLButtonElement>[] = Array.from(
    { length: bundle.variation_values.length },
    () => createRef<HTMLButtonElement>(),
  );

  useSetMaxWidthElementsInList({ refs: buttonRefs });

  return (
    <>
      {bundle.variation_values.map((el, i) => (
        <ProductColor
          key={el.id}
          value={el.amount}
          imageUrl={el.product_variation.variation.image_url || ''}
          ref={buttonRefs[i]}
        />
      ))}
    </>
  );
};
