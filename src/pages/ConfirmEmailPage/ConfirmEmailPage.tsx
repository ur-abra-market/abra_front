import React, { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import ContentMessage from 'components/ContentMessage';
import style from 'pages/ConfirmEmailPage/ConfirmEmailPage.module.css';
import { useAppDispatch } from 'store/hooks';
import { clearState, registerService } from 'store/reducers/registerSlice';

const ConfirmEmailPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token)
      dispatch(registerService({ route: 'confirmEmail', token })).then(() => {
        dispatch(clearState());
        navigate('/');
      });
  }, [dispatch, searchParams, navigate]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <ContentMessage title="Email has checked." text="Moving to main page..." />
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
