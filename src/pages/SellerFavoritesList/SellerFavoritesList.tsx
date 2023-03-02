import React from 'react';

import { Container } from '../../components';
import Feedback from '../../components/new-components/feedback/Feedback';
import { Search } from '../../components/ui-kit';
import InfoBtn from '../../components/ui-kit/InfoBtn/InfoBtn';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';

import style from './SellerFavoritesList.module.css';

const SellerFavoritesList = (): JSX.Element => {
  const arr = [];

  const exampleCount = 24;

  for (let i = 0; i < exampleCount; i += 1) {
    arr.push('item');
  }

  return (
    <div className={style.favorites_page}>
      <Header />
      <Container>
        <div className={style.top}>
          <h3 className={style.title}>Favorites list</h3>
          <Search className={style.search} placeholder="Search within my favorites" />
        </div>
        <div className={style.main}>
          {/* <ProductCard /> */}

          {arr.map((item, index) => (
            <div className={style.product_card} key={index}>
              {item}
            </div>
          ))}
        </div>
        <div className={style.bottom}>
          <InfoBtn />
        </div>
      </Container>
      <Feedback />
      <Footer />
    </div>
  );
};

export default SellerFavoritesList;
