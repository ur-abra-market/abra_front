import React, { createRef, FC, RefObject } from 'react';

import { useEqualWidth } from 'common/hooks';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductColorLocked } from 'ui-kit';

interface IBundleLockedColorList {
  bundle: IProductBundle;
}

export const BundleLockedColorList: FC<IBundleLockedColorList> = ({
  bundle,
}): JSX.Element => {
  const buttonRefs: RefObject<HTMLButtonElement>[] = Array.from(
    { length: bundle.variation_values.length },
    () => createRef<HTMLButtonElement>(),
  );

  useEqualWidth({ refs: buttonRefs });

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
