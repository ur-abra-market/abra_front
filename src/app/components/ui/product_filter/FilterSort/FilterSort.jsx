import React from 'react'
import SelectFilter from '../SelectFilter/SelectFilter'
import './FilterSort.css'

const FilterSort = () => {
  const listSort = ['Sort By Rating', 'Sort By Price (From High to Low)', 'Sort By Price (From Low to High)'];
  const listAccessories = ['All Categories', 'Clothes and Accessories', '...'];

  return (
    <div className='FilterSort'>
      <div className='FilterSort__title'>
        <h4>Filters</h4>
        <span className='FilterSort__reset'>Reset All</span>
      </div>
      <SelectFilter list={listSort} />
      <SelectFilter list={listAccessories} />       
    </div>
  )
}

export default FilterSort