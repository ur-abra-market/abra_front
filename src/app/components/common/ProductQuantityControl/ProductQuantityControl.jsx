import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeById } from '../../../store/reducers/basketSlice';
import './ProductQuantityControl.css'

const ProductQuantityControl = ({obj}) => {  
  const dispatch = useDispatch();  
  const [value, setValue] = useState(obj.sum);
  const max = useSelector((state) => state.product.max); 
  
  const handlerInput = () => {    
    const newObj = {...obj};
    const a = Math.ceil(value/100) * 100;
    if (a < 0) newObj.sum = 0
    else if (a > max) newObj.sum = max;
    else newObj.sum = a;   
    setValue(newObj.sum);
    dispatch(changeById({newObj}))       
  }

  const handlerQuantity = (a) => {   
    const newObj = {...obj};    
    if (a <= 0) {
      newObj.sum -= 100;  
      newObj.sum = newObj.sum < 0 ? 0 : newObj.sum;       
    }
    if (a > 0) {      
      newObj.sum += 100;
      newObj.sum = newObj.sum > max ? max : newObj.sum;      
    }        
    setValue(newObj.sum);
    dispatch(changeById({newObj}))
  }

  return (
    <div className='ProductQuantityControl'>
      <div className='ProductQuantityControl_btn' onClick={() => handlerQuantity(-1)}>—</div>
      <input className='ProductQuantityControl_sum' type='number' max={max} value={value} onChange={(e) =>setValue(+(e.target.value))} onBlur={handlerInput}/>      
      <div className='ProductQuantityControl_btn'onClick={() => handlerQuantity(1)}>+</div>
    </div>     
  )
}

export default ProductQuantityControl