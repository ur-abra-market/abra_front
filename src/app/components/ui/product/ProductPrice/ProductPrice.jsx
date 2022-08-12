import React from 'react'
import { useSelector } from 'react-redux';
import './ProductPrice.css'

const ProductPrice = () => {
  const price = useSelector((state) => state.product.price);
  return (
    <div className='ProductPrice'>
      <div className='amount'>${price}/pc</div>
      <span>/from 4 pcs</span>
    </div>
  )
}

export default ProductPrice