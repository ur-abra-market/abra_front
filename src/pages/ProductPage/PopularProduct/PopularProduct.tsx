import React from 'react';

import { Carousel } from 'components';

import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { useAppSelector } from '../../../store/hooks';

export const PopularProduct = (): JSX.Element => {
  const { popularProducts } = useAppSelector(state => state.popularProducts);

  const buildCarouselPopularProducts = (): JSX.Element[] => {
    return (
      popularProducts &&
      popularProducts.map((data: any) => {
        return <ProductCard product={data} key={data.id + data.name} />;
      })
    );
  };

  return (
    <Carousel
      title="Popular products in this category"
      arrayLength={popularProducts.length}
    >
      {popularProducts && buildCarouselPopularProducts()}
    </Carousel>
  );
};
