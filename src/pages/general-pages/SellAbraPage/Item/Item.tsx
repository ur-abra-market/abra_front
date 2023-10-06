import React, { FC } from 'react';

import { Paragraph, Title } from 'ui-kit';

import style from './Item.module.scss';

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
