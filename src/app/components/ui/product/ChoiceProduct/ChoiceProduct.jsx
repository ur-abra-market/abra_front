import React, { useState, useEffect } from 'react'
import './ChoiceProduct.css'

const ChoiceProduct = () => {
  const colors = ['#828282', '#b9b9b9', '#cfcfcf', '#dddddd'];
  const [quantity, SetQuantity] = useState(0);
  const [price, SetPrice] = useState(0);
  const [discount, SetDiscount] = useState(0);
  const max = 100;  
  const amount = price * quantity;  
  const ship = 220; 
  const total = discount + ship;

  const sum = (n) => {
    if (n < 0 && quantity === 0) SetQuantity(0)
    else if (n > 0 && quantity === max) SetQuantity(max)
    else SetQuantity(quantity + n) 
  }

  const printSum = (value) => {
    if (value < 0) SetQuantity(0)
    else if (value >  max) SetQuantity(max)
    else SetQuantity(value);
  }

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
          <span className='ChoiceProduct__quantity_max' onClick={() => SetQuantity(max) }>/from {max} pcs</span>
        </div>
        <div className='ChoiceProduct__quantity_control'>
          <div className='ChoiceProduct__quantity_btn' onClick={() => sum(-1)}>—</div> 
          <input className='ChoiceProduct__quantity_sum' type='number' max={max} value={quantity} onChange={(e) => printSum(+(e.target.value))}/>
          <div className='ChoiceProduct__quantity_btn'onClick={() => sum(1)}>+</div>
        </div>                       
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