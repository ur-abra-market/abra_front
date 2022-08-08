import React, { useState } from 'react'
import SearchFilter from '../SearchFilter';
import './FilterBrand.css'

const FilterBrand = () => {
  const brandList = ['Mavi', 'Kotton', 'LC Waikiki', 'Colin’s', 'DeFacto', 'Ipekyol']
  const brandCheck = brandList.map((_) => true);
  const [check, setCheck] = useState(brandCheck);
  

  const changeState = (index) => {
    const arrCheck = check.map((e, i) => i === index ? !e : e)    
    setCheck(arrCheck);   
  }

  return (
    <div className='FilterBrand'>
      <h4 className='FilterBrand__title'>Brand</h4>
      <SearchFilter />
      <div className='FilterBrand__list'>
        {brandList.map((s, i) => (
          <div 
            className='FilterBrand__list_item'
            style={{background: check[i] ? '#e5e5e5' : 'none'}}
            onClick={() => changeState(i)}
            key={`brand_${s}`}>{s}</div>
        ))}        
      </div>
    </div>
  )
}

export default FilterBrand