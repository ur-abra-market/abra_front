import React, { useState } from 'react';

import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { ProductsPreview } from '../../../components/ProductsPreview/ProductsPreview';
import { I_SimilarProduct } from '../../../interfaces';
import style from '../ProductPage.module.css';

export const SimilarProduct = (): JSX.Element => {
  // const { similarProducts } = useAppSelector(state => state.similarProducts);

  const product: I_SimilarProduct = {
    datetime: '2023-03-06',
    description: 'shirt description',
    grade_average: 4.2,
    id: 12,
    images: [
      {
        image_url:
          'https://images.asos-media.com/products/asos-design-skinny-trousers-in-check-with-elasticated-waist/21339425-1-black?$n_640w$&wid=513&fit=constrain',
      },
    ],
    is_active: true,
    name: 'shirt',
    prices: [
      { id: 1, min_quantity: 5, discount: 40, value: 10, end_date: '', start_date: '' },
    ],
    total_orders: 96,
  };

  const [similarProducts] = useState(Array(10).fill(product));

  const buildCarouselSimilarProducts = (): JSX.Element[] => {
    return (
      similarProducts &&
      similarProducts.map((data: any) => {
        return <ProductCard product={data} key={data.id + data.name} />;
      })
    );
  };

  return (
    <ProductsPreview
      title="Similar products in this category"
      className={style.popular_products_wrapper}
    >
      {similarProducts && buildCarouselSimilarProducts()}
    </ProductsPreview>
  );
};
