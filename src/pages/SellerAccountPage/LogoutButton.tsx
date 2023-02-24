import React from 'react';

import { Link } from 'react-router-dom';

import style from './SellerAccountPage.module.css';

const LogoutButton = (): JSX.Element => {
  return (
    <Link to="/" className={style.logout_button}>
      <div className={style.logout_button_text}>Log Out</div>
      <svg width={14} height={18} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.165 17.33a.834.834 0 0 1-.833-.833v-15a.833.833 0 0 1 .833-.833h11.667a.834.834 0 0 1 .833.833v15a.833.833 0 0 1-.833.834H1.165Zm8.334-5 4.166-3.333L9.5 5.664v2.5h-5v1.667h5v2.5Z"
          fill="#FC133D"
        />
      </svg>
    </Link>
  );
};

export default LogoutButton;
