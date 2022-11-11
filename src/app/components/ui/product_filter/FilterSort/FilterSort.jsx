import React from "react";
import { useDispatch } from "react-redux";
import { category, sort, priceFrom, priceTo, discount, brand, material, size, ascending } from '../../../../store/reducers/filterSlice';
import SelectFilter from "../SelectFilter";
import "./FilterSort.css";

const FilterSort = () => {
  const dispatch = useDispatch();   
  const listSort = [
    "Sort By Rating (From High to Low)",
    "Sort By Rating (From Low to High)",
    "Sort By Price (From High to Low)",
    "Sort By Price (From Low to High)",
  ];
  const listCategories = ["All Categories", "Clothes and Accessories"];

  const handlerReset = () => {
    dispatch(category(0));
    dispatch(sort('rating'));
    dispatch(priceFrom(0));
    dispatch(priceTo(0));
    dispatch(discount(false));
    dispatch(brand([]));
    dispatch(material([]));
    dispatch(size([]));
    dispatch(ascending(false));    
  }

  return (
    <div className="FilterSort">
      <div className="FilterSort__title">
        <h4>Filters</h4>
        <span className="FilterSort__reset" onClick={handlerReset}>Reset All</span>
      </div>
      <SelectFilter list={listSort} />
      <SelectFilter list={listCategories} />
    </div>
  );
};

export default FilterSort;
