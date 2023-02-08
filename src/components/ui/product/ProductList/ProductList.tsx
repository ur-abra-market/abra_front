import React, { useState } from 'react';

import { useAppSelector } from '../../../../store/hooks';
import { InfoBtn } from '../../../buttons';
import Card from '../../../Card';
import CardFull from '../../../CardFull';
import PaginatorProduct from '../../TypesView/product/PaginatorProduct';

import style from './ProductList.module.css';

const ProductList = (): JSX.Element => {
  const dataArr = useAppSelector(state => state.productPaginate.productsPage);

  const [list, setList] = useState(true);

  return (
    <div className={style.productList}>
      <div className={style.productList__control}>
        <div className={style.productList__control_btns}>
          <div
            className={style.productList__control_blocks}
            onClick={() => setList(false)}
          />
          <div
            className={style.productList__control_list}
            onClick={() => setList(true)}
          />

          <div
            className={style.productList__control_category}
          >{`< Clothes and Accessories`}</div>
        </div>
        <PaginatorProduct />
      </div>
      <div className={style.productList__list}>
        {dataArr.map((data, index) =>
          list ? (
            <CardFull key={`product-${index}`} props={data} />
          ) : (
            // @ts-ignore
            <Card key={`product-${index}`} props={data} />
          ),
        )}
      </div>
      <div className="ProductList__control">
        {/* <ShowPageProduct /> */}
        <PaginatorProduct />
      </div>
      <div className={style.productList__InfoBtn}>
        <InfoBtn />
      </div>
    </div>
  );
};

export default ProductList;
