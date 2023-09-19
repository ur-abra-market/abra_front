import React, { FC } from 'react';

import style from './DescriptionProduct.module.scss';

import { Title } from 'ui-kit/Title/Title';

interface DescriptionProductProps {
  description: string;
}

export const DescriptionProduct: FC<DescriptionProductProps> = ({
  description,
}): JSX.Element => {
  return (
    <div className={style.description_container}>
      <Title as="h3" className={style.title}>
        Description
      </Title>
      <p className={style.description}>{description}</p>
    </div>
  );
};
