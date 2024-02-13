import React, { FC, useState } from 'react';

import { Label } from 'ui-kit';
import { ButtonBundle } from 'ui-kit/buttons/ButtonBundle/ButtonBundle';

import style from './BundleButtons.module.scss';

interface IStateType {
  id: number;
  title: string;
  isSelected: boolean;
}

/* todo data will request from backend  */
const tempData: IStateType[] = [
  { id: 1, title: 'Bundle 1', isSelected: true },
  { id: 2, title: 'Bundle 2', isSelected: false },
  { id: 3, title: 'Bundle 3', isSelected: false },
];

export const BundleButtons: FC = (): JSX.Element => {
  const [activeBundle, setActiveBundle] = useState<number | null>();

  return (
    <Label label="Bundles" htmlFor="Bundles">
      <div className={style.bundle_button_wrapper}>
        {tempData.map(item => {
          return (
            <ButtonBundle
              key={item.id}
              onClick={() => setActiveBundle(item.id)}
              isSelected={item.id === activeBundle}
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
