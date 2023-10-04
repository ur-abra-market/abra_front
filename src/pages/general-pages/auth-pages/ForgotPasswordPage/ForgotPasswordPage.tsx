import React, { useState } from 'react';

import { ForgotPasswordForm } from '.';

import { IAuthFooterData } from 'common/types';
import { ContentMessage } from 'elements';
import { AuthPageLayout } from 'pages/general-pages/auth-pages/assets';
import { LOGIN } from 'routes';

import style from './ForgotPasswordPage.module.scss';

export type pageType = 'forgotPassword' | 'recoveryEmailIsSent';

export const ForgotPasswordPage = (): JSX.Element => {
  const [pageType, setPageType] = useState<pageType>('forgotPassword');
  const forgotPasswordFooterData: IAuthFooterData[] = [{ link: LOGIN, title: 'Log in' }];

  const togglePageType = (): void => {
    setPageType(prevState =>
      prevState === 'forgotPassword' ? 'recoveryEmailIsSent' : 'forgotPassword',
    );
  };

  return (
    <AuthPageLayout footerData={forgotPasswordFooterData}>
      {pageType === 'forgotPassword' ? (
        <>
          <ContentMessage
            title="Forgot the password?"
            text="Enter your email address to receive a link to reset your password"
            className={style.message}
          />
          <ForgotPasswordForm togglePageType={togglePageType} />
        </>
      ) : (
        <div className={style.wrapper}>
          <div className={style.header}>
            A link to reset your password <br /> has been sent to your email address.
          </div>
          <div className={style.subheader}>
            Make sure the email you received is indeed from Abra platform <br /> and
            follow the link to create a new password.
          </div>
        </div>
      )}
    </AuthPageLayout>
  );
};
