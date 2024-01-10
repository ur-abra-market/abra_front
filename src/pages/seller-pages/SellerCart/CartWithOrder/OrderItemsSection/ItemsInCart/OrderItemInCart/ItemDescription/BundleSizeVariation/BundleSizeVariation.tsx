import React, { FC } from 'react';

import { Paragraph } from 'ui-kit';

import style from './BundleSizeVariation.module.scss';

export interface IBundleSizeVariation {
  size: string;
}

export const BundleSizeVariation: FC<IBundleSizeVariation> = ({ size }): JSX.Element => {
  return (
    <Paragraph className={style.item_size}>
      Size: <span>{size}</span>
    </Paragraph>
  );
};
