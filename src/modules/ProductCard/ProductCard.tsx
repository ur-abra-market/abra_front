import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './ProductCard.module.scss';

import ProductImage from 'elements/ProductImage/ProductImage';
import { getPriceOneItem } from 'pages/seller-pages/ProductPage/helpers/getPriceOneItem';
import { PRODUCT_DETAILS } from 'routes';
import { IProductCompilation } from 'services/product/product.serviceTypes';
import { Stars } from 'ui-kit';

interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProductCompilation;
}

export const ProductCard: FC<IProductCard> = ({
  product,
  className,
  ...restProps
}): JSX.Element => {
  const { name, prices, description, images, id, grade_average, is_active } = product;

  const { min_quantity } = prices[0];
  const image_url = images[0]?.image_url;

  return (
    <div className={cn(style.card, className)} {...restProps}>
      <ProductImage
        imageUrl={image_url || ''}
        name={name}
        isFavorite={is_active}
        productId={id}
      />
      <Link tabIndex={-1} to={`${PRODUCT_DETAILS}/${id}`} className={style.link}>
        <div className={style.direction}>
          <span>{name}</span>
          <span>{description}</span>
        </div>
      </Link>
      <div className={style.price}>
        <div className={style.amount}>{getPriceOneItem(prices)}/pc</div>
        <span>{`/from ${min_quantity} pcs`}</span>
      </div>
      <Stars reward={grade_average || 0} />
    </div>
  );
};
