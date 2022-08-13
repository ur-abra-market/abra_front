import React, { useState } from 'react'
import SwitchBox from '../../../common/SwitchBox';
import './FilterPrice.css'

const FilterPrice = () => {
  const [priceFrom, SetPriceFrom] = useState(0);
  const [priceTo, SetPriceTo] = useState(100);

  return (
    <div className='FilterPrice'>
      <h4>Price, $</h4>
      <div className='FilterPrice__range'>
        <div className='FilterPrice__range_from'>
          <div className='FilterPrice__range_from-text'>From</div>
          <input className='FilterPrice__range_from-input' type="number" value={priceFrom} onChange={(e) =>SetPriceFrom(e.target.value)}/>
        </div>
        <div className='FilterPrice__range_to'>
          <div className='FilterPrice__range_to-text'>Up To</div>
          <input className='FilterPrice__range_to-input' type="number" value={priceTo} onChange={(e) =>SetPriceTo(e.target.value)}/>
        </div>
      </div>
      <SwitchBox label={'Only discounted items'} />      
    </div>
  )
}

export default FilterPrice