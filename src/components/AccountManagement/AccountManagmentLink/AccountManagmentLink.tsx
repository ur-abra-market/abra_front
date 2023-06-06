import React, { FC } from 'react';

import { SimpleLink } from '../../../ui-kit';

import style from './AccountManagmentLink.module.scss';

interface IAccountManagementLink {
  linkLabel: string;
  path: string;
  description: string;
}

export const AccountManagementLink: FC<IAccountManagementLink> = ({
  linkLabel,
  path,
  description,
}) => {
  return (
    <div className={style.link_container}>
      <SimpleLink className={style.link} to={path} color="accent">
        {linkLabel}
      </SimpleLink>
      <div className={style.link_description}>{description}</div>
    </div>
  );
};
