import React, { useState } from 'react'
import SearchFilter from '../SearchFilter';
import './FilterMaterial.css'

const FilterMaterial = () => {
  const materialList = ['Mavi', 'Kotton', 'LC Waikiki', 'Colin’s', 'DeFacto', 'Ipekyol']
  const materialCheck = materialList.map((_) => true);
  const [check, setCheck] = useState(materialCheck);
  

  const changeState = (index) => {
    const arrCheck = check.map((e, i) => i === index ? !e : e)    
    setCheck(arrCheck);   
  }

  return (
    <div className='FilterMaterial'>
      <h4 className='FilterMaterial__title'>Material</h4>
      <SearchFilter />
      <div className='FilterMaterial__list'>
        {materialList.map((s, i) => (
          <div 
            className='FilterMaterial__list_item'
            style={{background: check[i] ? '#e5e5e5' : 'none'}}
            onClick={() => changeState(i)}
            key={`material_${s}`}>{s}</div>
        ))}        
      </div>
    </div>
  )
}

export default FilterMaterial