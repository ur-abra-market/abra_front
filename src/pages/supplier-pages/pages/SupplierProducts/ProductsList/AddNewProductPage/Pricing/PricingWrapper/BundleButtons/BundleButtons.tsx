import React, { FC, useState } from 'react';

import { Label } from 'ui-kit';
import { ButtonBundle } from 'ui-kit/buttons/ButtonBundle/ButtonBundle';

import style from './BundleButtons.module.scss';

interface IStateType {
  id: number;
  title: string;
  isSelected: boolean;
}

interface IBundleButtons {
  tempData: IStateType[];
  selectedBundle: number;
  changeActiveBundle: (id: number) => void;
}

export const BundleButtons: FC<IBundleButtons> = ({
  tempData,
  selectedBundle,
  changeActiveBundle,
}): JSX.Element => {
  return (
    <Label label="Bundles" htmlFor="Bundles">
      <div className={style.bundle_button_wrapper}>
        {tempData.map(item => {
          return (
            <ButtonBundle
              key={item.id}
              onClick={() => changeActiveBundle(item.id)}
              isSelected={item.id === selectedBundle}
              className={style.bundle_button}
            >
              {item.title}
            </ButtonBundle>
          );
        })}
      </div>
    </Label>
  );
};
