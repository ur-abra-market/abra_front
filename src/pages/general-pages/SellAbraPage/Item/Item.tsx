import React, { FC } from 'react';

import style from './Item.module.scss';

import { Paragraph, Title } from 'ui-kit';

interface IItem {
  numberItem: number;
  title: string;
  description: string;
}

export const Item: FC<IItem> = ({ numberItem, description, title }) => (
  <div className={style.item}>
    <span className={style.number}>{numberItem}</span>
    <div>
      <Title as="h3" size="xs" className={style.title}>
        {title}
      </Title>
      <Paragraph size="m">{description}</Paragraph>
    </div>
  </div>
);
