import React from 'react';

import ContentMessage from 'components/ContentMessage';
import style from 'pages/general-pages/auth-pages/ConfirmEmailPage/ConfirmEmailPage.module.css';

export const CheckEmailPage = (): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <ContentMessage
          title="A link for sign up has been sent to your email address."
          text="Make sure the email you received is indeed from Abra platform and follow the link to create a new password."
        />
      </div>
    </div>
  );
};
