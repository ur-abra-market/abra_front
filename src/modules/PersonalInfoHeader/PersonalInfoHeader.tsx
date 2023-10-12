import React from 'react';

import { ButtonLogout } from 'elements';
import { Title } from 'ui-kit';

import style from './PersonalInfoHeader.module.scss';

export const PersonalInfoHeader = (): JSX.Element => {
  return (
    <div className={style.header}>
      <Title as="h2" size="s">
        Personal Info
      </Title>
      <ButtonLogout withIcon />
    </div>
  );
};
