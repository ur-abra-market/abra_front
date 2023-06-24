import { useState } from 'react';

import { useAppSelector } from '../../../../common/hooks';
import Card from '../../../Card';
import CardFull from '../../../CardFull';
import PaginatorProduct from '../../TypesView/product/PaginatorProduct';

import style from './ProductList.module.scss';

import { ViewGridDisabledIcon, ViewListDisabledIcon } from 'assets/icons';
import { ButtonInfo } from 'ui-kit';

const ProductList = (): JSX.Element => {
  const dataArr = useAppSelector(state => state.productPaginate.productsPage);

  const [list, setList] = useState(true);

  return (
    <div className={style.wrapper}>
      <div className={style.control}>
        <div className={style.control_btns}>
          <ViewGridDisabledIcon
            role="presentation"
            className={style.control_blocks}
            onClick={() => setList(false)}
          />
          <ViewListDisabledIcon
            role="presentation"
            className={style.control_list}
            onClick={() => setList(true)}
          />

          <div className={style.control_category}>{`< Clothes and Accessories`}</div>
        </div>
        <PaginatorProduct />
      </div>
      <div className={style.list}>
        {dataArr.map((data, index) =>
          list ? (
            <CardFull key={`product-${index}`} props={data} />
          ) : (
            // @ts-ignore
            <Card key={`product-${index}`} props={data} />
          ),
        )}
      </div>
      <div className="control">
        {/* <ShowPageProduct /> */}
        <PaginatorProduct />
      </div>
      <div className={style.info_btn}>
        <ButtonInfo />
      </div>
    </div>
  );
};

export default ProductList;
