import React from 'react';

import { Link } from 'react-router-dom';

import style from './FooterForSupplierPart.module.css';

const FooterForSupplierPart = (): JSX.Element => {
  return (
    <div className={style.footer}>
      <div className={style.footer_links_wrapper}>
        <div className={style.footer_copyright}>© 2022 Abra. </div>
        <Link to="/" className={style.footer_link}>
          Terms & Conditions
        </Link>
        <div className={style.footer_copyright}> and </div>
        <Link to="/" className={style.footer_link}>
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default FooterForSupplierPart;
