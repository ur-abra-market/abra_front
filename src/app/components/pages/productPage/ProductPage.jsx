import React from 'react'
import ProductPath from '../../common/ProductPath'
import ProductPhoto from '../../common/ProductPhoto'
import './ProductPage.css'

const ProductPage = () => {
  return (
    <div className='ProductPage'>
      <div className='ProductPage__basic'>
        <div className='ProductPage__basic_left'>
          <ProductPath />
          <ProductPhoto />
        </div>
        <div className='ProductPage__basic_right'>

        </div>
      </div>
      <div className='ProductPage__about'></div>
      <div className='ProductPage__reviews'></div>
      <div className='ProductPage__latest'></div>
    </div>
  )
}

export default ProductPage