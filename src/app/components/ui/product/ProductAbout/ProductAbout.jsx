import React from 'react'
import './ProductAbout.css'

const ProductAbout = () => {
  return (
    <div className='ProductAbout'>
      <h2>About the product</h2>
      <div className='ProductAbout__container'>
        <div className='ProductAbout__specifications'></div>
        <div className='ProductAbout__property'></div>
        <div className='ProductAbout__process'></div>
      </div>
    </div>
  )
}

export default ProductAbout