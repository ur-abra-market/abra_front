import React from "react";
import FilterBrand from "../../product_filter/FilterBrand";
import FilterGrowth from "../../product_filter/FilterGrowth";
import FilterMaterial from "../../product_filter/FilterMaterial";
import FilterPrice from "../../product_filter/FilterPrice";
import FilterSizes from "../../product_filter/FilterSizes";
import FilterSort from "../../product_filter/FilterSort";
import "./ProductFilter.css";

const ProductFilter = () => {
  return (
    <div className="ProductFilter">
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
