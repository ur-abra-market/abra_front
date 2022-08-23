import React from 'react'
import './ProductPrice.css'

const ProductPrice = ({price, quantity}) => {
  
  return (
    <div className='ProductPrice'>
      <div className='amount'>${price}/pc</div>
      <span>{`/from ${quantity} pcs`}</span>
    </div>
  )
}

export default ProductPrice