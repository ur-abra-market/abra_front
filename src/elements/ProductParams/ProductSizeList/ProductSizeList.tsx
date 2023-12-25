import React, { useState } from 'react';

import { SizeEnum } from 'common/types';
import { Paragraph } from 'ui-kit';
import { ProductSize } from 'ui-kit/ProductParams/ProductSize/ProductSize';

import style from './ProductSizeList.module.scss';

export const ProductSizeList = (): JSX.Element => {
  const [active, setActive] = useState<null | SizeEnum>(null);

  const temp = [
    { id: 1, size: SizeEnum.XS, quantity: 4 },
    { id: 2, size: SizeEnum.S, quantity: 5 },
    { id: 3, size: SizeEnum.M, quantity: 6 },
    { id: 4, size: SizeEnum.L, quantity: 7 },
    { id: 5, size: SizeEnum.XL, quantity: 8 },
    { id: 6, size: SizeEnum.XXL, quantity: 9 },
    { id: 7, size: SizeEnum.XXXL, quantity: 10 },
    { id: 8, size: SizeEnum.XXXXL, quantity: 11 },
  ];

  return (
    <div className={style.product_size_container}>
      <Paragraph size="m" className={style.text}>
        Size and quantity
      </Paragraph>
      <div className={style.items}>
        {temp.map(el => (
          <ProductSize
            key={el.id}
            size={el.size}
            quantity={el.quantity}
            selected={el.size === active}
            onClick={() => setActive(el.size)}
          />
        ))}
      </div>
    </div>
  );
};
