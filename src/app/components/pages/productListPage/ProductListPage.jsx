import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productPaginateService } from '../../../store/reducers/productPaginateSlice';
import ProductFilter from '../../ui/product/ProductFilter'
import ProductList from '../../ui/product/ProductList'

import './ProductListPage.css'

const ProductListPage = () => {  
  const dispatch = useDispatch();
  const paginate = useSelector((state) => state.paginate);     
  const filter = useSelector((state) => state.filter);
  const data = {...filter, ...paginate};  
  dispatch(productPaginateService(data));
   
  return (
    <div className='ProductListPage'>
      <ProductFilter />
      <ProductList />      
    </div>
  )
}

export default ProductListPage