import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';

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
  const { id, name, prices, description, images, grade_average, is_favorite } = product;
  // const { min_quantity } = prices[0];
  const min_quantity = 10; // TODO
  const image_url = images[0]?.image_url;
  const pathToProduct = `${PRODUCT_DETAILS}/${id}`;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(style.card, className)}
      {...restProps}
    >
      <ProductImage
        isHovered={isHovered}
        imageUrl={image_url || ''}
        name={name}
        productId={id}
        isFavorite={is_favorite}
      />
      <Link tabIndex={-1} to={pathToProduct} className={style.link}>
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
