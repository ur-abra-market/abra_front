import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { priceTo, priceFrom } from '../../../../store/reducers/filterSlice';
import { productPaginateService } from '../../../../store/reducers/productPaginateSlice';
import SwitchBox from '../../../common/SwitchBox';
import './FilterPrice.css'

const FilterPrice = () => {
  const dispatch = useDispatch();  
  const filter = useSelector((state) => state.filter);
  const paginate = useSelector((state) => state.paginate);
  const data = {...paginate, ...filter}
  
  const handlerPriceFrom = (value) => {
    dispatch(priceFrom(+value));    
    dispatch(productPaginateService(data));
  }

  const handlerPriceTo = (value) => {
    dispatch(priceTo(+value));    
    dispatch(productPaginateService(data));    
  }
  
   
  return (
    <div className='FilterPrice'>
      <h4>Price, $</h4>
      <div className='FilterPrice__range'>
        <div className='FilterPrice__range_from'>
          <div className='FilterPrice__range_from-text'>From</div>
          <input className='FilterPrice__range_from-input' type="number" value={filter.price_from} onChange={(e) => handlerPriceFrom(+e.target.value)}/>
        </div>
        <div className='FilterPrice__range_to'>
          <div className='FilterPrice__range_to-text'>Up To</div>
          <input className='FilterPrice__range_to-input' type="number" value={filter.price_to} onChange={(e) => handlerPriceTo(+e.target.value)}/>
        </div>
      </div>
      <SwitchBox label={'Only discounted items'} />      
    </div>
  )
}

export default FilterPrice