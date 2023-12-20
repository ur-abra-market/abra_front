import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { LazyImage } from 'elements/LazyImage/LazyImage';
import { PRODUCT_DETAILS } from 'routes';
import { IProductInCart } from 'store/reducers/seller/cart';
import { Paragraph } from 'ui-kit';

import style from './ItemDescription.module.scss';

export interface IItemDescription {
  product: IProductInCart;
  amount: number;
}

export const ItemDescription: FC<IItemDescription> = ({
  product,
  amount,
}): JSX.Element => {
  const image_url = product.images[0]?.image_url;

  return (
    <div className={style.item_description}>
      <NavLink to={`${PRODUCT_DETAILS}/${product.id}`}>
        <LazyImage src={image_url} className={style.image} type="default_image" />
      </NavLink>

      <div className={style.item_information}>
        <NavLink className={style.item_title} to={`${PRODUCT_DETAILS}/${product.id}`}>
          {product.name}
        </NavLink>

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
  );
};
