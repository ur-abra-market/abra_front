import React from 'react';

import style from './ProductFilter.module.scss';

import FilterBrand from 'old-components/ui/product_filter/FilterBrand';
import FilterGrowth from 'old-components/ui/product_filter/FilterGrowth';
import FilterMaterial from 'old-components/ui/product_filter/FilterMaterial';
import FilterPrice from 'old-components/ui/product_filter/FilterPrice';
import FilterSizes from 'old-components/ui/product_filter/FilterSizes';
import FilterSort from 'old-components/ui/product_filter/FilterSort';

const ProductFilter = (): JSX.Element => {
  return (
    <div className={style.product_filter}>
      <FilterSort />
      <FilterPrice />
      <FilterSizes />
      <FilterGrowth />
      <FilterBrand />
      <FilterMaterial />
    </div>
  );
};

export default ProductFilter;
