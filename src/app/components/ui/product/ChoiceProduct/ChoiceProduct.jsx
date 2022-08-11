import React, { useState, useEffect } from 'react'
import { input } from '../../../../store/reducers/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductQuantityControl from '../../../common/ProductQuantityControl/ProductQuantityControl';
import './ChoiceProduct.css'

const ChoiceProduct = () => {
  const colors = ['#828282', '#b9b9b9', '#cfcfcf', '#dddddd'];

  const dispatch = useDispatch();  
  const quantity = useSelector((state) => state.product.quantity);
  const max = useSelector((state) => state.product.max);
  const price = useSelector((state) => state.product.price);

  const [discount, SetDiscount] = useState(0);  
  const amount = price * quantity;  
  const ship = 220; 
  const total = discount + ship;

  useEffect(() => {    
    quantity > 99 ? SetDiscount(7.8 * quantity) : SetDiscount(price * quantity);    
  }, [quantity, price])
  

  return (
    <div className='ChoiceProduct'>
      <div className='ChoiceProduct__color'>
        <div className='ChoiceProduct__color_title'>Select color</div>
        <div className='ChoiceProduct__color_buttons'>
          {colors.map((background, i) => (
            <div className='ChoiceProduct__color_buttons-btn' key={`color-${i}`} style={{background}}/>
          ))}        
        </div>
      </div>
      <div className='ChoiceProduct__quantity'>
        <div className='ChoiceProduct__quantity_block'>
          <div className='ChoiceProduct__quantity_title'>Quantity</div>
          <span className='ChoiceProduct__quantity_max' onClick={(e) =>dispatch(input(max))}>/from {max} pcs</span>
        </div>
        <ProductQuantityControl />                      
      </div>
      <div className='ChoiceProduct__price'>
          <div className='ChoiceProduct__price-item'>1pc<span> .......................................... </span>${Math.floor(price) < price ? price.toFixed(2) : price}</div>
          <div className='ChoiceProduct__price-discount'>{max}pc <span> ............................................ </span>${Math.floor(discount) < discount ? discount.toFixed(2) : discount}</div>
          <div className='ChoiceProduct__price-amount'>{max}pc<span> ................................................... </span>${Math.floor(amount) < amount ? amount.toFixed(2) : amount}</div>          
          <div className='ChoiceProduct__price-ship'>Shipping <span> ................................................. </span>${Math.floor(ship) < ship ? ship.toFixed(2) : ship}</div>
          <div className='ChoiceProduct__price-total'><h4>Total</h4> <h4>${Math.floor(total) < total ? total.toFixed(2) : total}</h4></div>
        </div>      
    </div>
  )
}

export default ChoiceProduct