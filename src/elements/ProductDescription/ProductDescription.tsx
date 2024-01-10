import React, { FC } from 'react';

import cn from 'classnames';

import { Paragraph, Title } from 'ui-kit';

import style from './ProductDescription.module.scss';

interface DescriptionProductProps {
  description: string;
}

export const ProductDescription: FC<DescriptionProductProps> = ({
  description,
}): JSX.Element => {
  return (
    <div className={cn(style.description_container, style.section)}>
      <Title as="h3">Description</Title>
      <Paragraph size="s" className={style.description}>
        {description}
      </Paragraph>
    </div>
  );
};
