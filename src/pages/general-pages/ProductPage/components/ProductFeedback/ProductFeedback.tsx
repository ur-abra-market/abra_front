import React from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'common/hooks';
import { Reviews } from 'pages/general-pages/ProductPage/components/ProductFeedback/Reviews/Reviews';
import { HOME } from 'routes';
import { Title } from 'ui-kit';

import style from './ProductFeedback.module.scss';

export const ProductFeedback = (): JSX.Element => {
  const productFeedback = useAppSelector(state => state.product.feedbacks);

  const hasFeedback = Object.keys(productFeedback).length !== 0;

  return (
    <div className={cn(style.feedbacks_container, style.section)}>
      <div className={style.title_container}>
        <Title as="h3" className={style.title}>
          Feedbacks
        </Title>
        {hasFeedback && (
          <Link className={style.link} to={HOME}>
            See All
          </Link>
        )}
      </div>

      <Reviews hasFeedback={hasFeedback} feedback={productFeedback} />
    </div>
  );
};
