import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productPaginateService } from "../../../store/reducers/productPaginateSlice";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import ProductFilter from "../../ui/product/ProductFilter";
import ProductList from "../../ui/product/ProductList";

import "./ProductListPage.css";

const ProductListPage = () => {
  const dispatch = useDispatch();  
  const page_size = useSelector((state) => state.paginate.page_size);
  const page_num = useSelector((state) => state.paginate.page_num);  
  const sort_type = useSelector((state) => state.filter.sort_type); 
  const category = useSelector((state) => state.filter.category);  
  const price_from = useSelector((state) => state.filter.price_from);
  const price_to = useSelector((state) => state.filter.price_to);
  const discount = useSelector((state) => state.filter.discount);
  const ascending = useSelector((state) => state.filter.ascending);
  const brands = useSelector((state) => state.filter.brands);
  const materials = useSelector((state) => state.filter.materials);
  const sizes = useSelector((state) => state.filter.sizes);  
  const data = { page_size, page_num, sort_type, category, price_from, price_to, discount, ascending, brands, materials, sizes };
  dispatch(productPaginateService(data));
  
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
