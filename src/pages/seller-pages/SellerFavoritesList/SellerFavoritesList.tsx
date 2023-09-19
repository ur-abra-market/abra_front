import React from 'react';

import style from './SellerFavoritesList.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';
import { ButtonQuestion, Search } from 'ui-kit';
import { Title } from 'ui-kit/Title/Title';

export const SellerFavoritesList = WithLayout((): JSX.Element => {
  const arr = [];

  // const product: IShortCardProduct = {
  //   id: +new Date(),
  //   name: 'trousers',
  //   description: 'trousers description',
  //   total_orders: 44,
  //   grade_average: '4.5',
  //   date_added: '2021-04-11T10:20:30Z',
  //   with_discount: 2,
  //   price_include_discount: '50',
  //   min_quantity: 5,
  //   value_price: '100',
  //   is_favorite: 1,
  //   image_url:
  //     'https://images.asos-media.com/products/asos-design-cargo-tapered-trousers-in-black-with-toggles/202796442-1-black?$n_750w$&wid=750&hei=750&fit=crop',
  // };

  const exampleCount = 24;

  for (let i = 0; i < exampleCount; i += 1) {
    arr.push('item');
  }

  return (
    <div className={style.favorites_page}>
      <div className={style.container}>
        <div className={style.top}>
          <Title as="h3">Favorites list</Title>
          <Search className={style.search} placeholder="Search within my favorites" />
        </div>
        <div className={style.main}>
          {arr.map((item, index) => (
            <div className={style.product_card} key={index}>
              {item}
            </div>
          ))}
        </div>
        <div className={style.bottom}>
          <ButtonQuestion />
        </div>
      </div>
    </div>
  );
});
