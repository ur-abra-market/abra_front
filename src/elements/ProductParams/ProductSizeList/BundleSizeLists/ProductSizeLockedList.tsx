import { createRef, FC, RefObject } from 'react';

import { useEqualWidth } from 'common/hooks';
import { IProductBundle } from 'store/reducers/productSlice/types';
import { ProductSizeLocked } from 'ui-kit';

interface IProductSizeLockedList {
  bundle: IProductBundle;
}

export const ProductSizeLockedList: FC<IProductSizeLockedList> = ({
  bundle,
}): JSX.Element => {
  const buttonRefs: RefObject<HTMLButtonElement>[] = Array.from(
    { length: bundle.variation_values.length },
    () => createRef<HTMLButtonElement>(),
  );

  useEqualWidth({ refs: buttonRefs });

  return (
    <>
      {bundle.variation_values.map((el, index) => (
        <ProductSizeLocked
          key={el.id}
          size={el.product_variation.variation.value}
          quantity={el.amount}
          ref={buttonRefs[index]}
        />
      ))}
    </>
  );
};
