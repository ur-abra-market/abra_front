import React, { FC } from 'react';

import cn from 'classnames';

import { Stars } from 'ui-kit';
import { Star } from 'ui-kit/Stars/Star/Star';

import style from './Grades.module.scss';

interface IGradeProps {
  grade: string | number;
  fiveStar?: boolean;
  variant?: 'deals' | 'reviews';
  count: number | null;
  className?: string;
}

export const Grades: FC<IGradeProps> = ({
  grade,
  fiveStar = false,
  variant = 'reviews',
  count,
  className,
}): JSX.Element => {
  const containerMode = {
    [`${style.is_gap}`]: variant === 'reviews' && fiveStar,
  };
  const textContainerMode = {
    [`${style.deals}`]: variant === 'deals',
  };

  return (
    <div className={cn(style.container, containerMode, className)}>
      {fiveStar ? (
        <Stars reward={+grade} sizes="24" />
      ) : (
        <Star percent={`${grade}`} sizes="24" />
      )}

      <div className={cn(style.text_container, textContainerMode)}>
        <p>{grade}</p>
        {variant === 'reviews' && <p>/</p>}
        <p>
          {count} {variant === 'reviews' ? 'reviews' : 'Deals'}
        </p>
      </div>
    </div>
  );
};
