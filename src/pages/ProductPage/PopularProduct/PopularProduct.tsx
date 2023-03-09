import React, { useState } from 'react';

import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { ProductsPreview } from '../../../components/ProductsPreview/ProductsPreview';
import { IShortCardProduct } from '../../../interfaces';
import style from '../ProductPage.module.css';

export const PopularProduct = (): JSX.Element => {
  // const { popularProducts } = useAppSelector(state => state.popularProducts);

  const product: IShortCardProduct = {
    id: 12,
    name: 'shirt',
    description: 'shirt description',
    total_orders: 96,
    grade_average: '4.2',
    date_added: '2023-03-06',
    with_discount: 2,
    price_include_discount: '40',
    min_quantity: 5,
    value_price: 10,
    is_favorite: true,
    image_url:
      'https://images.asos-media.com/products/asos-design-skinny-trousers-in-check-with-elasticated-waist/21339425-1-black?$n_640w$&wid=513&fit=constrain',
  };

  const [popularProducts] = useState(Array(10).fill(product));

  const buildCarouselPopularProducts = (): JSX.Element[] => {
    return (
      popularProducts &&
      popularProducts.map((data: any) => {
        return <ProductCard product={data} key={data.id + data.name} />;
      })
    );
  };

  return (
    <ProductsPreview
      title="Popular products in this category"
      className={style.popular_products_wrapper}
    >
      {popularProducts && buildCarouselPopularProducts()}
    </ProductsPreview>
  );
};
