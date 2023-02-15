import React from 'react';

import { Carousel } from 'components';

import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { useAppSelector } from '../../../store/hooks';

export const SimilarProduct = (): JSX.Element => {
  const { similarProducts } = useAppSelector(state => state.similarProducts);

  const buildCarouselSimilarProducts = (): JSX.Element[] => {
    return (
      similarProducts &&
      similarProducts.map((data: any) => {
        return <ProductCard product={data} key={data.id + data.name} />;
      })
    );
  };

  return (
    <Carousel
      title="Similar products in this category"
      arrayLength={similarProducts.length}
    >
      {similarProducts && buildCarouselSimilarProducts()}
    </Carousel>
  );
};
