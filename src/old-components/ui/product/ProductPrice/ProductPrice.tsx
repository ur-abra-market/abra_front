import React, { FC } from 'react';

import style from './ProductPrice.module.scss';

interface ProductPriceProps {
  price: string;
  quantity: string;
}

const ProductPrice: FC<ProductPriceProps> = ({ price, quantity }): JSX.Element => {
  return (
    <div className={style.product_price}>
      <p>${price}/pc</p>
      <p className={style.min_quantity}>{`/from ${quantity} pcs`}</p>
    </div>
  );
};

export default ProductPrice;
