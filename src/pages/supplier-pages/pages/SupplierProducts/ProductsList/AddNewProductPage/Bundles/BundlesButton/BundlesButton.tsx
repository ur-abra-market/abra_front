import React, { FC } from 'react';

import cn from 'classnames';

import { ButtonIcon } from 'ui-kit';

import style from './BundlesButton.module.scss';

interface IBundlesButton {
  variationType: string;
  selected: boolean;
  onClick: () => void;
}

export const BundlesButton: FC<IBundlesButton> = ({
  variationType,
  selected,
  onClick,
}) => (
  <ButtonIcon
    type="button"
    className={cn(style.button, {
      [style.active]: selected,
    })}
    onClick={onClick}
  >
    {variationType}
  </ButtonIcon>
);
