import React, { FC } from 'react';

import { Button, Checkbox, Input } from '../../../../../ui-kit';

import style from './ProductItem.module.css';

interface ProductItemProps {
  product: any;
}
const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const changeQuantityHandler = (): void => {};

  const changeStatusHandler = (): void => {};

  return (
    <div className={style.container}>
      <div className={style.item_container}>
        <Checkbox
          className={style.checkbox}
          checked={product.checked}
          onChange={changeStatusHandler}
        />

        <div>
          <img
            className={style.container_img}
            src="src/assets/images/none.png"
            alt="img"
          />
        </div>

        <div>
          <p className={style.name}>{product.name}</p>
          <div className={style.info}>
            <div>Color: {product.color}</div>
            <div>Size: {product.size}</div>
            <div>Quantity: {product.quantity}</div>
          </div>
          <div className={style.price}>
            <p>${product.price}</p>
            <p className={style.special_offer}>Special offer: ≥ 200 = 1pc/$4.25</p>
          </div>
        </div>
      </div>

      <div className={style.quantity_container}>
        <div className={style.quantity_title}>
          Quantity
          <span className={style.quantity_from}>/from {product.minQuantity} pcs</span>
        </div>
        <div className={style.quantity_counter}>
          <Button color="white" className={style.button}>
            -
          </Button>
          <Input
            className={style.input}
            value={product.quantity}
            onChange={changeQuantityHandler}
          />
          <Button color="white" className={style.button}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
