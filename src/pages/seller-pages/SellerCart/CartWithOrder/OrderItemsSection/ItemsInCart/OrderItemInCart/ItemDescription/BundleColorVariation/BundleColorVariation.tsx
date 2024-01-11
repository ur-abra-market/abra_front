import React, { FC } from 'react';

import { Paragraph } from 'ui-kit';

import style from './BundleColorVariation.module.scss';

export interface IBundleColorVariation {
  color: string;
}

export const BundleColorVariation: FC<IBundleColorVariation> = ({
  color,
}): JSX.Element => {
  return (
    <Paragraph className={style.item_color}>
      Color: <span>{color}</span>
    </Paragraph>
  );
};
