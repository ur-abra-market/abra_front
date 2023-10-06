import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'common/hooks';
import { ContentMessage } from 'elements';
import { AuthPageLayout } from 'pages/general-pages/auth-pages/assets';
import { isAuthorizedSelector } from 'store/reducers/authSlice';

import style from './CheckEmailPage.module.scss';

const CheckEmailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(isAuthorizedSelector);

  useEffect(() => {
    if (isAuthorized) navigate(-1);
  }, [isAuthorized]);

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

export default CheckEmailPage;
