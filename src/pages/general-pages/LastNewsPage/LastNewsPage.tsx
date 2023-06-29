import React, { useState } from 'react';

import style from './LastNews.module.scss';

import { News } from '.';

import { WithLayout } from 'common/hocs/WithLayout';

export const LastNewsPage = WithLayout((): JSX.Element => {
  const [text] = useState([
    {
      title: 'This is news title',
      text: 'Lorem ipsum dolor sit amet consectetur. Velit iaculis eu cursus aliquam lacus. Viverra amet ultrices sed eu integer faucibus blandit feugiat.',
      image:
        'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg',
    },
  ]);

  return (
    <div className={style.container}>
      <p className={style.last_news}>Last News</p>
      <div className={style.container_block}>
        {text.map((el, index) => {
          return (
            <div key={index}>
              <News text={el.text} title={el.title} image={el.image} />
              <News text={el.text} title={el.title} image={el.image} />
              <News text={el.text} title={el.title} image={el.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
});
