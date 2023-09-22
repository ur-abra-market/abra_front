import React, { FC } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import style from './MainLogo.module.scss';

// variants: font-size: var(--fz-xl2) => (Header/Top, ErrorServerPage, SupplierTop, AdditionalHeaderBlock, MobileHeader),
//           font-size: var(--fz-xxxl) => (AuthPageLayout)

interface IMainLogo {
  className?: string;
}

export const MainLogo: FC<IMainLogo> = ({ className }): JSX.Element => {
  const titleClasses = cn(style.link, className);

  return (
    <Link to="/" className={titleClasses}>
      Abra
    </Link>
  );
};
