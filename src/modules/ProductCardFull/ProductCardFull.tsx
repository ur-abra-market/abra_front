import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './ProductCardFull.module.scss';

import ProductImage from 'elements/ProductImage/ProductImage';
import ProductPrice from 'old-components/ui/product/ProductPrice';
import SupplierCard from 'old-components/ui/product/SupplierCard';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import { Stars } from 'ui-kit';

interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProductCompilation;
}
export const ProductCardFull: FC<IProductCard> = ({
  product,
  className,
  ...restProps
}): JSX.Element => {
  const { images, name, prices, grade_average, total_orders, supplier, is_active } =
    product;

  return (
    <div className={cn(style.card_full, className)} {...restProps}>
      {/* <ImgSlider srcArr={images} /> */}
      <ProductImage
        imageUrl={images[0].image_url || ''}
        name={name}
        isFavorite={is_active}
      />
      <div className={style.card_info}>
        <div className={style.name}>{name}</div>
        <div className={style.categories}>
          <div className={style.category}>Clothes for women</div>
          <div className={style.category}>Dress</div>
          <div className={style.category}>Spring-Summer</div>
        </div>
        <div>
          <ProductPrice
            price={String(prices[0].value)}
            quantity={String(prices[0].min_quantity)}
          />
          <div className={style.reviews_info}>
            <Stars reward={+grade_average} />
            <span className={style.reviews}>/ 9 859 reviews</span>
          </div>
        </div>
        <SupplierCard supplier={supplier} />
      </div>
      <div className={style.orders_container}>
        <div className={style.orders}>{total_orders}</div>
      </div>
    </div>
  );
};
