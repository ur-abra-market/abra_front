import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardFull from "../../../common/CardFull";
import Card from "../../../common/Card";
import Paginator from "../../../common/Paginator";
import ShowPage from "../../../common/ShowPage";
import { InfoBtn } from "../../../common/buttons";
import "./ProductList.css";

const ProductList = () => {
  const dataArr = useSelector(
    (state) => state.productPaginate.dataProductPaginate
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
        <Paginator />
      </div>
      <div className="ProductList__list">
        {dataArr.map((data, index) =>
          list ? (
            <CardFull key={`${data}-${index}`} props={data} />
          ) : (
            <Card key={`${data}-${index}`} props={data} />
          )
        )}
      </div>
      <div className="ProductList__control">
        <ShowPage />
        <Paginator />
      </div>
      <div className="ProductList__InfoBtn">
        <InfoBtn />
      </div>
    </div>
  );
};

export default ProductList;
