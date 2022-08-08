import React, { useState } from 'react';
import './FilterSizes.css';

const FilterSizes = () => {
  const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL']
  const sizeCheck = sizeList.map((_) => false);
   
  const [check, setCheck] = useState(sizeCheck);
  
  const changeState = (index) => {
    const arrCheck = check.map((e, i) => i === index ? !e : e)    
    setCheck(arrCheck);   
  }

 
  return (
    <div className='FilterSizes'>
      <h4>Sizes</h4>
      <div className='FilterSizes__list'>
        {sizeList.map((s, i) => (
          <div 
            className='FilterSizes__list_item'
            style={{background: check[i] ? '#e5e5e5' : 'none'}}
            onClick={() => changeState(i)}
            key={`size_${s}`}>{s}</div>
        ))}        
      </div>
    </div>
  )
}

export default FilterSizes