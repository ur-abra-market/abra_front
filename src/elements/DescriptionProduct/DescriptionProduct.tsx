import React, { FC } from 'react';

import { Paragraph, Title } from 'ui-kit';

import style from './DescriptionProduct.module.scss';

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
