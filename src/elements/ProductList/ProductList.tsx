import { useState } from 'react';

import style from './ProductList.module.scss';
import { ViewGrid, ViewList } from './ViewIcons/ViewIcons';

import { useAppSelector } from 'common/hooks';
import Card from 'old-components/Card';
import CardFull from 'old-components/CardFull';
import PaginatorProduct from 'old-components/ui/TypesView/product/PaginatorProduct';
import { ButtonInfo } from 'ui-kit';

export type ViewType = 'grid' | 'list';

export const ProductList = (): JSX.Element => {
  const dataArr = useAppSelector(state => state.productPaginate.productsPage);

  const [selectedView, setSelectedView] = useState<ViewType>('grid');

  return (
    <div className={style.wrapper}>
      <div className={style.control}>
        <div className={style.control_btns}>
          <ViewGrid selectedView={selectedView} setSelectedView={setSelectedView} />
          <ViewList selectedView={selectedView} setSelectedView={setSelectedView} />
          <div className={style.control_category}>{`< Clothes and Accessories`}</div>
        </div>
        <PaginatorProduct />
      </div>
      <div className={style.list}>
        {dataArr.map((data, index) =>
          selectedView ? (
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
