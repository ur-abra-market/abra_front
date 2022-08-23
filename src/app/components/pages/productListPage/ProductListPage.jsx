import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productPaginateService } from '../../../store/reducers/productPaginateSlice';
import ProductFilter from '../../ui/product/ProductFilter'
import ProductList from '../../ui/product/ProductList'

import './ProductListPage.css'

const ProductListPage = () => {  
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.paginate.activePage);   
  const amountItems = useSelector((state) => state.paginate.amountItems);  
  const categoryProduct = useSelector((state) => state.product.categoryProduct);
  const data = {page_num: activePage, page_size: amountItems, category: categoryProduct};
  dispatch(productPaginateService(data));
   
  return (
    <div className='ProductListPage'>
      <ProductFilter />
      <ProductList />      
    </div>
  )
}

export default ProductListPage