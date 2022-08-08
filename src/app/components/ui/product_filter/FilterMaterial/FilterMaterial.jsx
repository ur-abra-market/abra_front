import React, { useState } from 'react'
import SearchFilter from '../SearchFilter';
import './FilterMaterial.css'

const FilterMaterial = () => {
  const materialList = ['Cotton', 'Chiffon', 'Linen', 'Biflex', 'Silk', 'Satin']
  const materialCheck = materialList.map((_) => false);
  const [check, setCheck] = useState(materialCheck);
  

  const changeState = (ctx) => {
    const arrCheck = check.map((e, i) => materialList[i] === ctx ? !e : e)    
    setCheck(arrCheck);   
  }

  return (
    <div className='FilterMaterial'>
      <h4 className='FilterMaterial__title'>Material</h4>
      <SearchFilter />
      <div className='FilterMaterial__list'>
        {materialList.filter((b, i) => check[i]).map((m, i) => (
          <div 
            className='FilterMaterial__list_item filter-item_active'
            style={{background: '#000000', color: '#ffffff'}}
            onClick={() => changeState(m)}
            key={`material_${m}`}>{m}</div>
        ))}        
      </div>
      <div className='FilterMaterial__list'>
        {materialList.filter((b, i) => !check[i]).map((m, i) => (
          <div 
            className='FilterMaterial__list_item'
            style={{background: '#e5e5e5', color: '#000000'}}
            onClick={() => changeState(m)}
            key={`material_${m}`}>{m}</div>
        ))}        
      </div>
    </div>
  )
}

export default FilterMaterial