import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brand, reset } from '../../../../store/reducers/filterSlice';
import SearchFilter from '../SearchFilter';
import './FilterBrand.css'

const FilterBrand = () => {
  const dispatch = useDispatch();
  const resetArr = useSelector((state) => state.filter.reset);
  const brandList = ['Mavi', 'Kotton', 'LC Waikiki', 'Colin’s', 'DeFacto', 'Ipekyol']
  const brandCheck = brandList.map((_) => false);
  const [check, setCheck] = useState(brandCheck);
  const [len, setLen] = useState(brandCheck.length); 

  useEffect(() => {
    if (resetArr[6]) {
      setCheck(brandList.map((_) => false));
      resetArr[6] = false;
      dispatch(reset(resetArr));
    }
  }, resetArr)

   
  const changeState = (ctx) => {
    const arrCheck = check.map((e, i) => brandList[i] === ctx ? !e : e)   
    setLen(arrCheck.filter(e => !e).length); 
    const brandArr = brandList.filter((_, i) => arrCheck[i]).map((b) => b.toLowerCase());
    dispatch(brand(brandArr));           
    setCheck(arrCheck);   
  }

  return (
    <div className='FilterBrand'>
      <h4 className='FilterBrand__title'>Brand</h4>
      <SearchFilter typeSearch='brand'/>
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