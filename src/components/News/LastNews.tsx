import React, { FC, useState } from 'react';

import { Layout } from '../../layouts/Layout/Layout';

import { News } from './Content/News';
import style from './LastNews.module.css';

const LastNews: FC = () => {
  const [text] = useState([
    {
      title: 'This is news title',
      text: 'Lorem ipsum dolor sit amet consectetur. Velit iaculis eu cursus aliquam lacus. Viverra amet ultrices sed eu integer faucibus blandit feugiat.',
      image:
        'https://www.freecodecamp.org/news/content/images/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg',
    },
  ]);

  return (
    <Layout>
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
    </Layout>
  );
};

export default LastNews;
