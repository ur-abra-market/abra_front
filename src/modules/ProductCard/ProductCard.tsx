import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import ProductImage from 'elements/ProductImage/ProductImage';
import { getPriceOneItem } from 'pages/seller-pages/ProductPage/helpers/getPriceOneItem';
import { PRODUCT_DETAILS } from 'routes';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import { Stars } from 'ui-kit';

import style from './ProductCard.module.scss';

interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProductCompilation;
}

export const ProductCard: FC<IProductCard> = ({
  product,
  className,
  ...restProps
}): JSX.Element => {
  const { name, prices, description, images, id, grade_average } = product;

  // const { min_quantity } = prices[0];
  const min_quantity = 10; // TODO
  const image_url = images[0]?.image_url;

  return (
    <article className={cn(style.card, className)} {...restProps}>
      <Link tabIndex={-1} to={`${PRODUCT_DETAILS}/${id}`} className={style.link}>
        <ProductImage imageUrl={image_url || ''} name={name} />
        <div className={style.direction}>
          <h4 className={style.card_title}>{name}</h4>
          <p className={style.card_description}>{description}</p>
        </div>
        <div className={style.price}>
          <p className={style.amount}>{getPriceOneItem(prices)}/pc</p>
          <span className={style.rating}>{`/from ${min_quantity} pcs`}</span>
        </div>
        <Stars reward={grade_average || 0} />
      </Link>
    </article>
  );
};
