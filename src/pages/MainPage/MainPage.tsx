import React, { useEffect, useState } from 'react';

import { Container } from '../../components';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductsPreview } from '../../components/ProductsPreview/ProductsPreview';
import { WithLayout } from '../../hocs/WithLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { ImagesBlock } from './ImagesBlock/ImagesBlock';
import style from './MainPage.module.css';

import { InfoBtn } from 'components/buttons';
import Feedback from 'components/new-components/feedback/Feedback';
import StatusProduct from 'pages/MainPage/StatusProduct';
import { fetchProductList } from 'store/reducers/mainPageSlice';

export enum Categories {
  ALL,
  CLOTHES,
  ACCESSORIES,
  COSMETICS,
}

type Category = Record<
  number,
  {
    label: string;
    category_id: Categories;
  }
>;

const CATEGORIES: Category = {
  0: {
    label: 'All categories',
    category_id: Categories.ALL,
  },
  1: {
    label: `Clothes`,
    category_id: Categories.CLOTHES,
  },
  2: {
    label: `Accessories`,
    category_id: Categories.ACCESSORIES,
  },
  3: {
    label: `Cosmetics and Self Care`,
    category_id: Categories.COSMETICS,
  },
};
const MainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.product.statusProduct);
  const { products } = useAppSelector(state => state.mainPageProducts);

  // const [test] = useState(Array(10).fill(1));
  const [page] = useState({ page_num: 1, page_size: 10 });

  useEffect(() => {
    Object.values(CATEGORIES).forEach(({ category_id }) => {
      dispatch(fetchProductList({ type: filter, category_id, ...page }));
    });
  }, [filter]);

  return (
    <div className={style.main_page}>
      <ImagesBlock className={style.images_block} />
      <Container>
        <StatusProduct />
        <div className={style.main_sliders}>
          {products &&
            Object.keys(products).map(key => {
              return (
                <ProductsPreview key={key} title={CATEGORIES[+key].label}>
                  {products[+key].map(product => (
                    <ProductCard key={`${key}-category-section`} product={product} />
                  ))}
                </ProductsPreview>
              );
            })}
        </div>
        <div className={style.info_block}>
          <InfoBtn className={style.info_btn} />
        </div>
      </Container>
      <Feedback />
    </div>
  );
};

export default WithLayout(MainPage);
