import React, { FC } from 'react';

import cn from 'classnames';

import { ButtonIcon } from 'ui-kit';

import style from './VariationButton.module.scss';

interface IVariationButton {
  variationType: string;
  selected: boolean;
  onClick: () => void;
}

export const VariationButton: FC<IVariationButton> = ({
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
