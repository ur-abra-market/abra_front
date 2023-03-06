import React, { useState } from 'react';

import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { ProductsPreview } from '../../../components/ProductsPreview/ProductsPreview';
import { IPopularProduct } from '../../../interfaces';
import style from '../ProductPage.module.css';

export const PopularProduct = (): JSX.Element => {
  // const { popularProducts } = useAppSelector(state => state.popularProducts);

  const product: IPopularProduct = {
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
