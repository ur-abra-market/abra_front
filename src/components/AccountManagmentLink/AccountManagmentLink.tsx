import React from 'react';

import { Link } from 'react-router-dom';

import style from './AccountManagmentLink.module.css';

interface IProps {
  linkLabel: string;
  path: string;
  description: string;
}

export const AccountManagementLink: React.FC<IProps> = props => {
  const { linkLabel, path, description } = props;

  return (
    <div className={style.link_container}>
      <Link className={style.link} to={path}>
        {linkLabel}
      </Link>
      <div className={style.link_description}>{description}</div>
    </div>
  );
};
