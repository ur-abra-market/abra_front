import React, { useState } from 'react'
import SearchFilter from '../SearchFilter';
import './FilterBrand.css'

const FilterBrand = () => {
  const brandList = ['Mavi', 'Kotton', 'LC Waikiki', 'Colin’s', 'DeFacto', 'Ipekyol']
  const brandCheck = brandList.map((_) => false);
  const [check, setCheck] = useState(brandCheck);
  const [len, setLen] = useState(brandCheck.length);
  

  const changeState = (ctx) => {
    const arrCheck = check.map((e, i) => brandList[i] === ctx ? !e : e)   
    setLen(arrCheck.filter(e => !e).length);
    setCheck(arrCheck);   
  }

  return (
    <div className='FilterBrand'>
      <h4 className='FilterBrand__title'>Brand</h4>
      <SearchFilter />
      <div className='FilterBrand__btns' style={{gap: len < check.length ? '24px' : '0px'}}>
        <div className='FilterBrand__list'>
          {brandList.filter((b, i) => check[i]).map((b) => (
            <div 
              className='FilterBrand__list_item filter-item_active'
              style={{background: '#000000', color: '#ffffff'}}
              onClick={() => changeState(b)}
              key={`brand_${b}`}>{b}</div>
          ))}               
        </div>
        <div className={len ? 'FilterBrand__list' : 'none'}>
          {brandList.filter((b, i) => !check[i]).map((b) => (
            <div 
              className='FilterBrand__list_item'
              style={{background: '#e5e5e5', color: '#000000'}}
              onClick={() => changeState(b)}
              key={`brand_${b}`}>{b}</div>
          ))}            
        </div>
      </div>      
    </div>
  )
}

export default FilterBrand