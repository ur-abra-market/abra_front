import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { Quantity } from './Quantity';

import { useAppDispatch } from 'common/hooks';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { IProductInCart, setSelectProduct } from 'store/reducers/seller/cart';
import { Checkbox, Paragraph, Title } from 'ui-kit';

import style from './OrderItemInCart.module.scss';

interface IOrderItemInCart {
  product: IProductInCart;
  amount: number;
  is_checked: boolean;
}

export const OrderItemInCart: FC<IOrderItemInCart> = ({
  product,
  amount,
  is_checked,
}): JSX.Element => {
  const image_url = product.images[0]?.image_url;
  const dispatch = useAppDispatch();

  const onCheckedProductHandler = (id: number | null): unknown =>
    dispatch(setSelectProduct({ id }));

  return (
    <li className={style.order_list_item}>
      <Checkbox
        variant="default"
        checked={is_checked}
        onChange={() => onCheckedProductHandler(product.id)}
      />

      <div className={style.product_info}>
        <div className={style.item_description}>
          <NavLink to="/cart">
            <LazyImage src={image_url} className={style.image} type="default_image" />
          </NavLink>

          <div className={style.item_information}>
            <Title as="h3" weight="semi_bold" className={style.item_title}>
              {product.name}
            </Title>

            <div className={style.item_details}>
              <Paragraph className={style.item_color}>
                Color: <span className={style.item_color_property}>Silver</span>
              </Paragraph>
              <Paragraph className={style.item_pieces}>
                Pieces: <span className={style.item_pieces_property}>{amount}</span>
              </Paragraph>
            </div>

            <div className={style.order_details}>
              <div className={style.item_price}>
                <Paragraph weight="semi_bold" className={style.total_price}>
                  ${780}
                </Paragraph>
                <div className={style.item_price_details}>
                  <Paragraph weight="medium" className={style.value_bundles}>
                    {300} bundles
                  </Paragraph>
                  <span className={style.line} />
                  <div className={style.item_prices}>
                    <Paragraph weight="medium" className={style.old_price}>
                      ${4.2}/{1}bnd
                    </Paragraph>
                    <Paragraph weight="medium" className={style.new_price}>
                      ${4.0}/{1}bnd
                    </Paragraph>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Quantity amount={amount} />
      </div>
    </li>
  );
};
