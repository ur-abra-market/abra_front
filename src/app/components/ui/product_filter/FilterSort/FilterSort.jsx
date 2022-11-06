import React from 'react'
import SelectFilter from '../SelectFilter'
import style from './FilterSort.module.css'

const FilterSort = () => {
  const listSort = [
    'Sort By Rating',
    'Sort By Price (From High to Low)',
    'Sort By Price (From Low to High)'
  ]
  const listCategories = ['All Categories', 'Clothes and Accessories']

  return (
    <div className={style.silterSort}>
      <div className={style.silterSort__title}>
        <h4>Filters</h4>
        <span className={style.silterSort__reset}>Reset All</span>
      </div>
      <SelectFilter list={listSort} />
      <SelectFilter list={listCategories} />
    </div>
  )
}

export default FilterSort
