import React from 'react'
import ProductFilter from '../../ui/product/ProductFilter'
import ProductList from '../../ui/product/ProductList'

import './ProductListPage.css'

const ProductListPage = () => {
  return (
    <div className='ProductListPage'>
      <ProductFilter />
      <ProductList />      
    </div>
  )
}

export default ProductListPage