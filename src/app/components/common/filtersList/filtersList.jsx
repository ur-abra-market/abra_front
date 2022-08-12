import React from 'react';
import PropTypes from "prop-types";

const FiltersList = ({ filters, className, activeClassName, onItemSelect, selectedItem }) => {
    return (
        filters.map((filter) => (
            <div 
                key={filter.replace(/ /g,'').toLowerCase()}
                className={filter === selectedItem ? activeClassName : className}
                onClick={() => onItemSelect(filter)}
                role='button'
            >
                {filter}
            </div>
        ))
    )
}

FiltersList.propTypes = {
    filters: PropTypes.array.isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.string
  };

export default FiltersList;