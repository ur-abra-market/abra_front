import { FC } from 'react';

import { ArrowIcon } from 'assets/icons';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import ProductImage from 'elements/ProductImage/ProductImage';
import { amountRange } from 'modules/ProductCard/helper/amountRange';
import { PRODUCT_DETAILS } from 'routes';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import { SimpleLink, Stars } from 'ui-kit';

import style from './ProductCardFull.module.scss';

interface IProductCardFull {
  product: IProductCompilation;
}

export const ProductCardFull: FC<IProductCardFull> = ({ product }): JSX.Element => {
  const {
    id,
    images,
    name,
    grade_average,
    total_orders,
    supplier,
    category,
    is_favorite,
    reviews_count,
    prices,
    min_price,
    max_price,
  } = product;

  const categoryArr = category.name.split('&');
  const { min_quantity } = prices[0];
  const pathToProduct = `${PRODUCT_DETAILS}/${id}`;

  return (
    <div className={style.card_full}>
      <SimpleLink to={pathToProduct} tabIndex={-1}>
        <ProductImage
          imageUrl={images[0].image_url || ''}
          name={name}
          productId={id}
          isFavorite={is_favorite}
          className={style.card_image}
        />
      </SimpleLink>
      <div className={style.card_info}>
        <SimpleLink to={pathToProduct} className={style.name} tabIndex={-1}>
          {name}
        </SimpleLink>

        <div className={style.categories}>
          {categoryArr.map(el => (
            <p key={el} className={style.category}>
              {el}
            </p>
          ))}
        </div>
        <div className={style.price}>
          <p className={style.amount}>{amountRange(min_price, max_price)}/pc</p>
          <span className={style.rating}>{`/from ${min_quantity} pcs`}</span>
        </div>

        <div>
          <div className={style.reviews_info}>
            <Stars reward={grade_average} />
            <span className={style.reviews}>/ {reviews_count} reviews</span>
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

            <div className={style.suppler_name_container}>
              <p className={style.supplier_name}>{supplier?.company.name}</p>
              <ArrowIcon className={style.supplier_arrow} />
            </div>
            <p className={style.suppler_details}>
              1 Years : 1 Deals : On-time delivery 1%
            </p>
          </div>

          <div className={style.orders}>{total_orders} Orders</div>
        </div>
      </div>
    </div>
  );
};
