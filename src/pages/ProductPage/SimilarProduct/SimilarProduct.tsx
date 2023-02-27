import React from 'react';

import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { ProductsPreview } from '../../../components/ProductsPreview/ProductsPreview';
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
    <ProductsPreview title="Similar products in this category">
      {similarProducts && buildCarouselSimilarProducts()}
    </ProductsPreview>
  );
};
