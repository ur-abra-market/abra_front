import React from 'react';

import { Link } from 'react-router-dom';

import { Paragraph, Title } from 'ui-kit';

import style from './FeedBacksProduct.module.scss';

export const FeedBacksProduct = (): JSX.Element => {
  return (
    <div className={style.feedbacks_container}>
      <div className={style.title_container}>
        <Title as="h3" className={style.title}>
          Feedbacks
        </Title>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link className={style.link} to="#">
          See All
        </Link>
      </div>
      <Paragraph size="s" className={style.description}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consequatur esse est
        harum libero molestias officia, quam quidem quo quos sequi sint, sit. Excepturi id
        itaque soluta totam veniam vero? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Autem consequuntur cum cupiditate expedita itaque nihil quod
        repellat? Ex ipsa libero magni molestiae recusandae soluta ullam. Aspernatur dolor
        iste quaerat quasi!
      </Paragraph>
    </div>
  );
};
