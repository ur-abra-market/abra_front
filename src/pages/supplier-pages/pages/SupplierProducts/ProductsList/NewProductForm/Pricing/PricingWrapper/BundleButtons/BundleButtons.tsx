import React, { FC, useState } from 'react';

import { Label } from 'ui-kit';
import { ButtonBundle } from 'ui-kit/buttons/ButtonBundle/ButtonBundle';

import style from './BundleButtons.module.scss';

interface IStateType {
  id: number;
  title: string;
  isSelected: boolean;
}

export const BundleButtons: FC = (): JSX.Element => {
  const [state, setState] = useState<IStateType[]>([
    { id: 1, title: 'Bundle 1', isSelected: true },
    { id: 2, title: 'Bundle 2', isSelected: false },
    { id: 3, title: 'Bundle 3', isSelected: false },
  ]); /* todo data will request from backend  */

  const handlerSelectBundle = (id: number): void => {
    const updatedState: IStateType[] = state.map(item =>
      item.id === id
        ? {
            ...item,
            isSelected: true,
          }
        : {
            ...item,
            isSelected: false,
          },
    );

    setState(updatedState);
  };

  return (
    <Label label="Bundles" htmlFor="Bundles">
      <div className={style.bundle_button_wrapper}>
        {state.map(item => {
          return (
            <ButtonBundle
              key={item.id}
              onClick={() => handlerSelectBundle(item.id)}
              isSelected={item.isSelected}
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
