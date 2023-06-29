import React, { FC, useState } from 'react';

import cn from 'classnames';

import style from './ChoiceProduct.module.scss';

import { useAppSelector } from 'common/hooks';
import ProductQuantityControl from 'old-components/ProductQuantityControl';
import { Button } from 'ui-kit';

interface ChoiceProductProps {
  colors: string[];
}
const ChoiceProduct: FC<ChoiceProductProps> = ({ colors }): JSX.Element => {
  const [activeColor, setActiveColor] = useState<string>(colors[0]);

  // const price = +productData.info.value_price
  // const quantity = +productData.info.quantity
  const price = 123;
  const quantity = 1;
  const product_id = 34;
  const max = 100;
  // const max = useSelector((state) => state.product.max)

  const basket = useAppSelector(state => state.basket.basketProduct);
  // const product = basket.find(
  //   (obj) => obj.product_id === product_id
  // )
  // const propsNew = product ? product : productData
  const propsNew = basket.find(obj => obj.product_id === product_id);

  const discount = 0;
  const amount = price * quantity;
  const ship = 220;
  const total = discount + ship;

  return (
    <div className={style.choice_product}>
      <div>
        <div className={style.choice_product_color_title}>Select color</div>
        <div className={style.choice_product_color_buttons}>
          {colors.map((background, i) => (
            <Button
              color="white"
              className={cn(style.choice_product_color_buttons_btn, {
                [style.active]: activeColor === background,
              })}
              onClick={() => setActiveColor(background)}
              key={`color-${i}`}
              style={{ background }}
            />
          ))}
        </div>
      </div>
      <div className={style.choice_product_quantity}>
        <div className={style.choice_product_quantity_block}>
          <div className={style.choice_product_quantity_title}>Quantity</div>
          {/* <span */}
          {/*  className={style.choiceProduct__quantity_max} */}
          {/*  onClick={() => dispatch(input(max))} */}
          {/* > */}
          {/*  /from {propsNew?.info.quantity} pcs */}
          {/* </span> */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span className={style.choice_product_quantity_max} onClick={() => {}}>
            /from {100} pcs
          </span>
        </div>
        <ProductQuantityControl obj={propsNew} />
      </div>
      <div className={style.choice_product_price}>
        <div className={style.choice_product_price_item}>
          1pc
          <span className={style.choice_product_price_item_line} />$
          {Math.floor(price) < price ? price.toFixed(2) : price}
        </div>

        <div className={style.choice_product_price_item}>
          {max}pc <span className={style.choice_product_price_item_line} />
          {Math.floor(discount) < discount ? discount.toFixed(2) : discount}
        </div>

        <div className={style.choice_product_price_item}>
          {max}pc <span className={style.choice_product_price_item_line} />$
          {Math.floor(amount) < amount ? amount.toFixed(2) : amount}
        </div>

        <div className={style.choice_product_price_item}>
          Shipping <span className={style.choice_product_price_item_line} />$
          {Math.floor(ship) < ship ? ship.toFixed(2) : ship}
        </div>

        <div className={style.choice_product_price_total}>
          <div>Total</div>
          <div>${Math.floor(total) < total ? total.toFixed(2) : total}</div>
        </div>
      </div>
    </div>
  );
};

export default ChoiceProduct;
