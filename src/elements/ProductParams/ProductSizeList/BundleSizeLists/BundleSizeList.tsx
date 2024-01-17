import { createRef, FC, RefObject } from 'react';

import { useSetMaxWidthElementsInList } from 'common/hooks';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductSize } from 'ui-kit';

interface IBundleSizeList {
  bundle: IProductBundle;
}

export const BundleSizeList: FC<IBundleSizeList> = ({ bundle }): JSX.Element => {
  const buttonRefs: RefObject<HTMLButtonElement>[] = Array.from(
    { length: bundle.variation_values.length },
    () => createRef<HTMLButtonElement>(),
  );

  useSetMaxWidthElementsInList({ refs: buttonRefs });

  return (
    <>
      {bundle.variation_values.map((el, index) => (
        <ProductSize
          key={el.id}
          size={el.product_variation.variation.value}
          quantity={el.amount}
          ref={buttonRefs[index]}
        />
      ))}
    </>
  );
};
