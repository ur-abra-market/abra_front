import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { BundleColorVariation } from './BundleColorVariation';
import { BundlePrice } from './BundlePrice';
import { BundleSizeVariation } from './BundleSizeVariation';

import { LazyImage } from 'elements/LazyImage/LazyImage';
import { PRODUCT_DETAILS } from 'routes';
import { IProductInCart } from 'store/reducers/seller/cart';
import { IPriceBundle, IVariation } from 'store/reducers/seller/cart/types';
import { Paragraph } from 'ui-kit';

import style from './ItemDescription.module.scss';

export interface IItemDescription {
  product: IProductInCart;
  amount: number;
  pieces: number;
  price: IPriceBundle[];
  bundle_variation_value: IVariation;
}

export const ItemDescription: FC<IItemDescription> = ({
  product,
  amount,
  pieces,
  price,
  bundle_variation_value,
}): JSX.Element => {
  const imageUrl = product.images[0]?.image_url;
  const priceValue = price[0].value;
  const variationBundleType = bundle_variation_value.type.name;
  const colorValue = bundle_variation_value.value;
  const sizeValue = bundle_variation_value.value;
  const totalPriceBundle = priceValue * amount;
  const isColorVariation = variationBundleType === 'Color';

  return (
    <div className={style.item_description}>
      <NavLink to={`${PRODUCT_DETAILS}/${product.id}`}>
        <LazyImage src={imageUrl} className={style.image} type="default_image" />
      </NavLink>

      <div className={style.item_information}>
        <NavLink className={style.item_title} to={`${PRODUCT_DETAILS}/${product.id}`}>
          {product.name}
        </NavLink>

        <div className={style.item_details}>
          {isColorVariation ? (
            <BundleColorVariation color={colorValue} />
          ) : (
            <BundleSizeVariation size={sizeValue} />
          )}

          <Paragraph className={style.item_pieces}>
            Pieces: <span className={style.item_pieces_property}>{pieces}</span>
          </Paragraph>
        </div>

        <div className={style.order_details}>
          <BundlePrice totalPriceBundle={totalPriceBundle} priceValue={priceValue} />
        </div>
      </div>
    </div>
  );
};
