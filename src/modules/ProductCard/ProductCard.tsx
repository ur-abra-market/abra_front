import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { amountRange } from './helper/amountRange';

import ProductImage from 'elements/ProductImage/ProductImage';
import { PRODUCT_DETAILS } from 'routes';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import { Stars } from 'ui-kit';

import style from './ProductCard.module.scss';

interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProductCompilation;
  isFavorite?: boolean;
}
// TODO isFavorite is mock data. Wait correct data
export const ProductCard: FC<IProductCard> = ({
  product,
  isFavorite,
  className,
  ...restProps
}): JSX.Element => {
  const {
    id,
    name,
    prices,
    description,
    images,
    grade_average,
    is_favorite,
    max_price,
    min_price,
  } = product;
  const { min_quantity } = prices[0];
  const image_url = images && images[0] && images[0].image_url ? images[0].image_url : '';
  const pathToProduct = `${PRODUCT_DETAILS}/${id}`;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(style.card, className)}
      {...restProps}
    >
      <Link tabIndex={-1} to={pathToProduct} className={style.link}>
        <ProductImage
          isHovered={isHovered}
          imageUrl={image_url || ''}
          name={name}
          productId={id}
          isFavorite={isFavorite || is_favorite}
        />
        <div className={style.direction}>
          <h4 className={style.card_title}>{name}</h4>
          <p className={style.card_description}>{description}</p>
        </div>
        <div className={style.price}>
          <span className={style.amount}>
            {amountRange(min_price.value, max_price.value)}/pc
          </span>
          <span className={style.rating}>{`/from ${min_quantity} pcs`}</span>
        </div>
        <Stars reward={grade_average || 0} />
      </Link>
    </article>
  );
};
