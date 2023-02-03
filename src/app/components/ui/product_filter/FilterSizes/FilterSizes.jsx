import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { size } from '../../../../store/reducers/filterSlice'
import style from './FilterSizes.module.css'

const FilterSizes = () => {
  const dispatch = useDispatch()
  const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL']
  const sizes = useSelector((state) => state.filter.sizes)
    
  const changeState = (index) => {
    const arrCheck = sizeList.map((s) => sizes.includes(s)).map((e, i) => i === index ? !e : e)        
    const sizeArr = sizeList.filter((_, i) => arrCheck[i])     
    dispatch(size(sizeArr))         
  }
 
  return (
    <div className={style.filterSizes}>
      <h4>Sizes</h4>
      <div className={style.filterSizes__list}>
        {sizeList.map((s, i) => (
          <div 
            className='FilterSizes__list_item'
            style={{background: sizes.includes(s) ? '#000000' : '#ffffff', color: sizes.includes(s) ? '#ffffff' : '#000000'}}
            onClick={() => changeState(i)}
            key={`size_${s}`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterSizes
