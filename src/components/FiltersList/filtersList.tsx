import React, { FC } from 'react';

interface FiltersListProps {
  filters: any;
  className: string;
  activeClassName: string;
  onItemSelect: Function;
  selectedItem: string;
}
const FiltersList: FC<FiltersListProps> = ({
  filters,
  className,
  activeClassName,
  onItemSelect,
  selectedItem,
}): JSX.Element => {
  return (
    <>
      {Object.keys(filters).map(filter => (
        <div
          key={filter.replace(/ /g, '').toLowerCase()}
          className={filter === selectedItem ? activeClassName : className}
          onClick={() => onItemSelect(filter)}
          role="presentation"
        >
          {filter}
        </div>
      ))}
    </>
  );
};

export default FiltersList;
