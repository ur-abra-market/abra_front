import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productPaginateService } from "../../../store/reducers/productPaginateSlice";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import ProductFilter from "../../ui/product/ProductFilter";
import ProductList from "../../ui/product/ProductList";

import "./ProductListPage.css";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const paginate = useSelector((state) => state.paginate);
  const filter = useSelector((state) => state.filter);
  const data = { ...filter, ...paginate };

  useEffect(() => {
    dispatch(productPaginateService(data));
  });

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
