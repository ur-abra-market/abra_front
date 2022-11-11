import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardFull from "../../../common/CardFull";
import Card from "../../../common/Card";
import PaginatorProduct from "../PaginatorProduct/PaginatorProduct";
import ShowPageProduct from "../ShowPageProduct";
import { InfoBtn } from "../../../common/buttons";
import "./ProductList.css";

const ProductList = () => {
  const dataArr = useSelector(
    (state) => state.productPaginate.productsPage
  );
    
  const [list, setList] = useState(true);
  return (
    <div className="ProductList">
      <div className="ProductList__control">
        <div className="ProductList__control_btns">
          <div
            className="ProductList__control_blocks"
            onClick={() => setList(false)}
          />
          <div
            className="ProductList__control_list"
            onClick={() => setList(true)}
          />
          <div className="ProductList__control_category">{`< Clothes and Accessories`}</div>
        </div>
        <PaginatorProduct />
      </div>
      <div className="ProductList__list">
        {dataArr.map((data, index) =>
          list ? (
            <CardFull key={`product_${data.product_id}-${index}`} props={data} />
          ) : (
            <Card key={`product_${data.product_id}-${index}`} props={data} />
          )
        )}
      </div>
      <div className="ProductList__control">
        <ShowPageProduct />
        <PaginatorProduct />
      </div>
      <div className="ProductList__InfoBtn">
        <InfoBtn />
      </div>
    </div>
  );
};

export default ProductList;
