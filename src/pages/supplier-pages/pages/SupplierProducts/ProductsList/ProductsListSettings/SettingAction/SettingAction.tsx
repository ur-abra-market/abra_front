import React, { FC } from 'react';

import style from './SettingAction.module.scss';

interface ISettingAction {
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SettingAction: FC<ISettingAction> = ({ text, Icon }): JSX.Element => {
  return (
    <div className={style.inner}>
      <Icon />
      <span className={style.add_and_removed}>{text}</span>
    </div>
  );
};
