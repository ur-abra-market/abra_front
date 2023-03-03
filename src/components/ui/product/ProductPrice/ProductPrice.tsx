import React, { FC } from 'react';

import style from './ProductPrice.module.css';

interface ProductPriceProps {
  price: string;
  quantity: string;
}

const ProductPrice: FC<ProductPriceProps> = ({ price, quantity }) => {
  return (
    <div className={style.productPrice}>
      <div className="amount">${price}/pc</div>
      <span>{`/from ${quantity} pcs`}</span>
    </div>
  );
};

export default ProductPrice;
