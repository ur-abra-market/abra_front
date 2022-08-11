import React from 'react'
import { increment, decrement, input } from '../../../store/reducers/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import './ProductQuantityControl.css'

const ProductQuantityControl = () => {
  const dispatch = useDispatch();  
  const quantity = useSelector((state) => state.product.quantity);
  const max = useSelector((state) => state.product.max);
  return (
    <div className='ProductQuantityControl'>
      <div className='ProductQuantityControl_btn' onClick={() => dispatch(decrement())}>—</div> 
      <input className='ProductQuantityControl_sum' type='number' max={max} value={quantity} onChange={(e) =>dispatch(input(+(e.target.value)))}/>
      <div className='ProductQuantityControl_btn'onClick={() => dispatch(increment())}>+</div>
    </div>     
  )
}

export default ProductQuantityControl