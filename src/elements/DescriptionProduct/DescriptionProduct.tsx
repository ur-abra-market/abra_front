import React, { FC } from 'react';

import style from './DescriptionProduct.module.scss';

interface DescriptionProductProps {
  description: string;
}

export const DescriptionProduct: FC<DescriptionProductProps> = ({
  description,
}): JSX.Element => {
  return (
    <div className={style.description_container}>
      <h3 className={style.title}>Description</h3>
      <p className={style.description}>{description}</p>
    </div>
  );
};
