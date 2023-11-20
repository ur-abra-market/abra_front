import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { Quantity } from './Quantity';

import { Checkbox, Paragraph, Title } from 'ui-kit';

import style from './OrderItemInCart.module.scss';

export const OrderItemInCart: FC<any> = ({ item }): JSX.Element => {
  return (
    <li className={style.order_list_item} key={item.id}>
      <Checkbox variant="default" className={style.checkbox_item} />
      <div className={style.product_info}>
        <div className={style.item_description}>
          <NavLink to="/cart">
            <img src={item.images[0].image_url} className={style.image} alt="" />
          </NavLink>
          <div className={style.item_information}>
            <Title as="h3" weight="semi_bold" className={style.item_title}>
              {item.name}
            </Title>
            <div className={style.item_details}>
              <Paragraph className={style.item_color}>
                Color: <span className={style.item_color_property}>Silver</span>
              </Paragraph>
              <Paragraph className={style.item_pieces}>
                Pieces: <span className={style.item_pieces_property}>{item.amount}</span>
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
              <Quantity item={item} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
