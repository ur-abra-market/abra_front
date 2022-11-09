import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { material } from '../../../../store/reducers/filterSlice';
import SearchFilter from '../SearchFilter';
import './FilterMaterial.css'

const FilterMaterial = () => {
  const dispatch = useDispatch();
  const materialList = ['Cotton', 'Chiffon', 'Linen', 'Biflex', 'Silk', 'Satin']
  const materialCheck = materialList.map((_) => false);
  const [check, setCheck] = useState(materialCheck);
  const [len, setLen] = useState(materialCheck.length);
  
  const changeState = (ctx) => {
    const arrCheck = check.map((e, i) => materialList[i] === ctx ? !e : e)    
    setLen(arrCheck.filter(e => !e).length);
    const materialArr = materialList.filter((_, i) => arrCheck[i]);    
    dispatch(material(materialArr));  
    setCheck(arrCheck);   
  }

  return (
    <div className='FilterMaterial'>
      <h4 className='FilterMaterial__title'>Material</h4>
      <SearchFilter typeSearch='material'/>
      <div className='FilterMaterial__btns' style={{gap: len < check.length ? '24px' : '0px'}}>
        <div className='FilterMaterial__list'>
          {materialList.filter((b, i) => check[i]).map((m) => (
            <div 
              className='FilterMaterial__list_item filter-item_active'
              style={{background: '#000000', color: '#ffffff'}}
              onClick={() => changeState(m)}
              key={`material_${m}`}>{m}</div>
          ))}        
        </div>
        <div className={len ? 'FilterMaterial__list' : 'none'}>
          {materialList.filter((b, i) => !check[i]).map((m) => (
            <div 
              className='FilterMaterial__list_item'
              style={{background: '#e5e5e5', color: '#000000'}}
              onClick={() => changeState(m)}
              key={`material_${m}`}>{m}</div>
          ))}        
        </div>
      </div>      
    </div>
  )
}

export default FilterMaterial