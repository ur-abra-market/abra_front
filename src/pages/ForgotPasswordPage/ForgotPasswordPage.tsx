import React, { useState } from 'react';

import style from './ForgotPasswordPage.module.css';

import ContentMessage from 'components/ContentMessage';
import ForgotPasswordForm from 'components/ui/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  const [pageType, setPageType] = useState('forgotPassword');

  const togglePageType = () => {
    setPageType(prevState =>
      prevState === 'forgotPassword' ? 'recoveryEmailIsSent' : 'forgotPassword',
    );
  };

  return (
    <div className={style.page_wrap}>
      {pageType === 'forgotPassword' ? (
        <>
          <ContentMessage
            title="Forgot the password?"
            text="Enter your email address to receive a link to reset your password"
            className={style.content}
          />
          <div className={style.inner_wrapper}>
            <ForgotPasswordForm togglePageType={togglePageType} />
          </div>
        </>
      ) : (
        <>
          <div className={style.header}>
            <p>A link to reset your password</p>
            <p>has been sent to your email address.</p>
          </div>
          <div className={style.subheader}>
            <p>Make sure the email you received is indeed from Abra platform</p>
            <p>and follow the link to create a new password.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
