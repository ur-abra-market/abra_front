import React from 'react';

import { AuthPageLayout } from '../assets/components/AuthPageLayout/AuthPageLayout';

import style from './CheckEmailPage.module.scss';

import ContentMessage from 'components/ContentMessage';

export const CheckEmailPage = (): JSX.Element => {
  return (
    <AuthPageLayout>
      <div className={style.wrapper}>
        <ContentMessage
          title="A link for sign up has been sent to your email address."
          text="Make sure the email you received is indeed from Abra platform and follow the link to create a new password."
        />
      </div>
    </AuthPageLayout>
  );
};
