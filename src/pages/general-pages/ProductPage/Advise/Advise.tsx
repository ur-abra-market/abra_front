import { FC } from 'react';

import cn from 'classnames';

import { ViewMoreProductsLink } from 'elements';
import { ProductCard, ProductsPreview } from 'modules';
import { IProductCompilation } from 'services/product/product.serviceTypes';

import style from './Advise.module.scss';

interface IAdvise {
  products: IProductCompilation[];
  title: string;
  className?: string;
}

export const Advise: FC<IAdvise> = ({ products, title, className }): JSX.Element => {
  return (
    <div className={cn(style.section, className)}>
      <ProductsPreview title={title}>
        {products.map(
          (product: IProductCompilation): JSX.Element => (
            <ProductCard key={product.id} product={product} />
          ),
        )}
        <ViewMoreProductsLink />
      </ProductsPreview>
    </div>
  );
};
