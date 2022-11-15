import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productPaginateService } from "../../../store/reducers/productPaginateSlice";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import ProductFilter from "../../ui/product/ProductFilter";
import ProductList from "../../ui/product/ProductList";

import "./ProductListPage.css";

const ProductListPage = () => {
  const dispatch = useDispatch();   
  const paginate = useSelector((state) => state.productPaginate);  
  const filter = useSelector((state) => state.filter); 
  const data = { 
    page_size: paginate.pageSize,
    page_num: paginate.pageNum,
    sort_type: filter.sort_type,
    category: filter.category, 
    price_from: filter.price_from,
    price_to: filter.price_to,
    discount: filter.discount,
    ascending: filter.ascending, 
    brands: filter.brands,
    materials: filter.materials,
    sizes: filter.sizes
  };
  useEffect(() => {
    dispatch(productPaginateService(data));
  }, [paginate, filter]);  
  
  return (
    <>
      <Header />
      <div className="ProductListPage">
        <ProductFilter />
        <ProductList />
      </div>
      <Footer />
    </>
  );
};

export default ProductListPage;
