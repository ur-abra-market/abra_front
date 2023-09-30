import React, { FC } from 'react';

import style from './AccountManagmentLink.module.scss';

import { Paragraph, SimpleLink } from 'ui-kit';

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
      <Paragraph size="s" className={style.link_description}>
        {description}
      </Paragraph>
    </div>
  );
};
