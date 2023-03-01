import React from 'react';

import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { ProductsPreview } from '../../../components/ProductsPreview/ProductsPreview';
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
    <ProductsPreview title="Popular products in this category">
      {popularProducts && buildCarouselPopularProducts()}
    </ProductsPreview>
  );
};
