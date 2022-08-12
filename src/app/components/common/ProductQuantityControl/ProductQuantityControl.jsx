import React from 'react'
import { increment, decrement, input } from '../../../store/reducers/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import './ProductQuantityControl.css'
import { useState } from 'react';
import { useEffect } from 'react';

const ProductQuantityControl = () => {
  const dispatch = useDispatch();  
  const quantity = useSelector((state) => state.product.quantity);
  const [value, setValue] = useState(quantity);
  const max = useSelector((state) => state.product.max); 
  
  useEffect(() => {
    setValue(quantity);
  }, [quantity])
  const handler = () => {    
    dispatch(input(value));    
  }

  return (
    <div className='ProductQuantityControl'>
      <div className='ProductQuantityControl_btn' onClick={() => dispatch(decrement())}>—</div>
      <input className='ProductQuantityControl_sum' type='number' max={max} value={value} onChange={(e) =>setValue(+(e.target.value))} onBlur={handler}/>      
      <div className='ProductQuantityControl_btn'onClick={() => dispatch(increment())}>+</div>
    </div>     
  )
}

export default ProductQuantityControl