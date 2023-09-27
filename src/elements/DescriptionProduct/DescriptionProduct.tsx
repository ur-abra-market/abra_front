import React, { FC } from 'react';

import style from './DescriptionProduct.module.scss';

import { Paragraph, Title } from 'ui-kit';

interface DescriptionProductProps {
  description: string;
}

export const DescriptionProduct: FC<DescriptionProductProps> = ({
  description,
}): JSX.Element => {
  return (
    <div className={style.description_container}>
      <Title as="h3">Description</Title>
      <Paragraph size="s" className={style.description}>
        {description}
      </Paragraph>
    </div>
  );
};
