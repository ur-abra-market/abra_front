import React, { useEffect } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';

import ContentMessage from 'components/common/ContentMessage';
import style from 'pages/ConfirmEmailPage/ConfirmEmailPage.module.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { registerService } from 'store/reducers/registerSlice';

const ConfirmEmailPage = () => {
  const dispatch = useAppDispatch();
  const resServer = useAppSelector(state => state.register.resMessage);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) dispatch(registerService({ route: 'email_confirmation_result', token }));
  }, [searchParams]);

  useEffect(() => {
    if (resServer === 'REGISTRATION_SUCCESSFUL') navigate('/', { replace: true });
  }, [resServer]);

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

export default ConfirmEmailPage;
