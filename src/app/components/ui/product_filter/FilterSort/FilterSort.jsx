import React from "react";
import SelectFilter from "../SelectFilter";
import "./FilterSort.css";

const FilterSort = () => {
  const listSort = [
    "Sort By Rating (From High to Low)",
    "Sort By Rating (From Low to High)",
    "Sort By Price (From High to Low)",
    "Sort By Price (From Low to High)",
  ];
  const listCategories = ["All Categories", "Clothes and Accessories"];

  return (
    <div className="FilterSort">
      <div className="FilterSort__title">
        <h4>Filters</h4>
        <span className="FilterSort__reset">Reset All</span>
      </div>
      <SelectFilter list={listSort} />
      <SelectFilter list={listCategories} />
    </div>
  );
};

export default FilterSort;
