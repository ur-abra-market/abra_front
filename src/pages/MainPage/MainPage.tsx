import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { ImagesBlock } from './ImagesBlock/ImagesBlock';
import style from './MainPage.module.css';

import { InfoBtn } from 'components/buttons';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Slider from 'components/Slider';
import Feedback from 'components/ui/feedback/Feedback';
import StatusProduct from 'pages/MainPage/StatusProduct';
import { fetchProductList } from 'store/reducers/mainPageSlice';

const MainPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.product.statusProduct);
  const categories = useAppSelector(state => state.mainPageProducts.products);

  const CATEGORIES = {
    0: 'All categories',
    1: `Women's clothes`,
    2: `Men's clothes`,
    3: `Kid's clothes`,
  };

  useEffect(() => {
    Object.keys(CATEGORIES).forEach(category => {
      dispatch(fetchProductList({ type: filter, category }));
    });
  }, []);

  return (
    <>
      <Header style={{ width: '100%' }} />
      <div className={style.main_page}>
        <ImagesBlock className={style.images_block} />
        <StatusProduct />
        <div className={style.main_sliders}>
          {Object.keys(categories).map(categoryId => (
            <Slider
              key={categoryId}
              // @ts-ignore
              title={CATEGORIES[categoryId]}
              // @ts-ignore
              products={categories[categoryId]}
            />
          ))}
        </div>
        <InfoBtn />
      </div>
      <Feedback />
      <Footer />
    </>
  );
};

export default MainPage;
