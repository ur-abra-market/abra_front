import React, { FC } from 'react'

import style from './ProductItem.module.css'

interface ProductItemProps {
  product: any
}
const ProductItem: FC<ProductItemProps> = ({ product }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const changeQuantityHandler = () => {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const changeStatusHandler = () => {}

  return (
    <div className={style.product_item}>
      <div className={style.product_item_main_container}>
        <div>
          <input
            className={style.product_item_main_container_checkbox}
            checked={product.checked}
            onChange={changeStatusHandler}
            type="checkbox"
          />
        </div>

        <div>
          <img
            className={style.product_item_main_container_img}
            src="src/assets/img/icons/none.png"
            alt="img"
          />
        </div>

        <div>
          <p className={style.product_item_main_container_name}>
            {product.name}
          </p>
          <div className={style.product_item_main_container_info}>
            <div>Color: {product.color}</div>
            <div>Size: {product.size}</div>
            <div>Quantity: {product.quantity}</div>
          </div>
          <div className={style.product_item_main_container_price}>
            <p>${product.price}</p>
            <p className={style.product_item_main_container_price_special}>
              Special offer: ≥ 200 = 1pc/$4.25
            </p>
          </div>
        </div>
      </div>

      <div className={style.product_item_quantity_container}>
        <div className={style.product_item_quantity_container_title}>
          Quantity
          <span className={style.product_item_quantity_container_title_from}>
            /from {product.minQuantity} pcs
          </span>
        </div>
        <div className={style.product_item_quantity_container_quantity}>
          {/* eslint-disable-next-line react/button-has-type */}
          <button className={style.product_item_quantity_container_button}>
            -
          </button>
          <input
            className={style.product_item_quantity_container_input}
            value={product.quantity}
            onChange={changeQuantityHandler}
            type="text"
          />
          {/* eslint-disable-next-line react/button-has-type */}
          <button className={style.product_item_quantity_container_button}>
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
