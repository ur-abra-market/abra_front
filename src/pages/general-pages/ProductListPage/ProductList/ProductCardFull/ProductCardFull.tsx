import { FC } from 'react';

import style from './ProductCardFull.module.scss';

import { ArrowIcon } from 'assets/icons';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import ProductImage from 'elements/ProductImage/ProductImage';
import ProductPrice from 'old-components/ui/product/ProductPrice';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import { Stars } from 'ui-kit';

interface IProductCard {
  product: IProductCompilation;
}

export const ProductCardFull: FC<IProductCard> = ({ product }): JSX.Element => {
  console.log(product);

  const {
    images,
    name,
    prices,
    grade_average,
    total_orders,
    supplier,
    is_active,
    category,
  } = product;

  const categoryArr = category.name.split('&');

  return (
    <div className={style.card_full}>
      <ProductImage
        imageUrl={images[0].image_url || ''}
        name={name}
        isFavorite={is_active}
      />

      <div className={style.card_info}>
        <div className={style.name}>{name}</div>

        <div className={style.categories}>
          {categoryArr.map(el => (
            <p key={el} className={style.category}>
              {el}
            </p>
          ))}
        </div>

        <div>
          <ProductPrice
            price={String(prices[0].value)}
            quantity={String(prices[0].min_quantity)}
          />
          <div className={style.reviews_info}>
            <Stars reward={grade_average} />
            {/* TODO (fake data) */}
            <span className={style.reviews}>/ 9 859 reviews</span>
          </div>
        </div>

        <div className={style.orders_container}>
          <div className={style.supplier_wrapper}>
            <div className={style.supplier_logo}>
              <LazyImage
                className={style.supplier_logo}
                type="logo"
                src={supplier?.company.logo_url}
              />
            </div>

            <div className={style.supplier_info}>
              <div className={style.suppler_name_container}>
                <p className={style.supplier_name}>{supplier?.company.name}</p>
                <ArrowIcon className={style.supplier_arrow} />
              </div>
              {/* TODO (fake data) */}
              <p className={style.suppler_details}>
                1 Years : 1 Deals : On-time delivery 1%
              </p>
            </div>
          </div>

          <div className={style.orders}>{total_orders} Orders</div>
        </div>
      </div>
    </div>
  );
};
