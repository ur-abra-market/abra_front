import React from 'react';

import cn from 'classnames';

import { ITag } from 'store/reducers/productSlice/types';
import { Paragraph, Title } from 'ui-kit';

import style from './LatestSearches.module.scss';

type LatestSearchesType = {
  tags: ITag[];
};

export const LatestSearches: React.FC<LatestSearchesType> = ({ tags }): JSX.Element => {
  return (
    <div className={cn(style.tags_container, style.section)}>
      <Title as="h3">Latest searches</Title>
      <div className={style.tags_wrapper}>
        {tags.map(el => {
          return (
            <Paragraph
              key={el.id}
              weight="semi_bold"
              size="s"
              className={style.description}
            >
              {el.name}
            </Paragraph>
          );
        })}
      </div>
    </div>
  );
};
