import React from 'react';

import style from './PersonalInfoHeader.module.scss';

import { ButtonLogout } from 'elements';
import { Title } from 'ui-kit';

export const PersonalInfoHeader = (): JSX.Element => {
  return (
    <div className={style.header}>
      <Title as="h2" size="xs">
        Personal Info
      </Title>
      <ButtonLogout withIcon />
    </div>
  );
};
