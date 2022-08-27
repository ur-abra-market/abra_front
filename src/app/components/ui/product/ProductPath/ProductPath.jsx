import React from 'react'
import './ProductPath.css'
const pathArr = ['Clothes for women', 'Dress', 'Spring-Summer']
const ProductPath = () => {
  return (
    <div className='ProductPath'>
      {
        pathArr.map((route, i) => (
          <p key={`path_${route}`}>{route}</p>
        ))
      }      
    </div>
  )
}

export default ProductPath