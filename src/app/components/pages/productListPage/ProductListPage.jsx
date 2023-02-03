import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productPaginateService } from '../../../store/reducers/productPaginateSlice'
import Footer from '../../common/Footer'
import Header from '../../common/Header'
import ProductFilter from '../../ui/product/ProductFilter'
import ProductList from '../../ui/product/ProductList'


const ProductListPage = () => {
  const dispatch = useDispatch()  
  const page_size = useSelector((state) => state.productPaginate.pageSize)
  const page_num = useSelector((state) => state.productPaginate.pageNum)  
  const {sort_type, category, price_from, price_to, discount, ascending, brands, materials, sizes, } = useSelector((state) => state.filter)    
  const data = { page_size, page_num, sort_type, category, price_from, price_to, discount, ascending, brands, materials, sizes }
  useEffect(() => {
    dispatch(productPaginateService(data))
  }, [data])  
  
  return (
    <>
      <Header />
      <div className="ProductListPage">
        <ProductFilter />
        <ProductList />
      </div>
      <Footer />
    </>
  )
}

export default ProductListPage
