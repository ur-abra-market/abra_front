import React from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Reviews } from './Reviews/Reviews';

import { useAppSelector } from 'common/hooks';
import { HOME } from 'routes';
import { Title } from 'ui-kit';

import style from './FeedbackProduct.module.scss';

export const FeedbackProduct = (): JSX.Element => {
  const feedbackProduct = useAppSelector(state => state.product.feedbacks);

  const hasFeedback = Object.keys(feedbackProduct).length !== 0;

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

      <Reviews hasFeedback={hasFeedback} feedback={feedbackProduct} />
    </div>
  );
};
