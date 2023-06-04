import React, { useEffect, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch';
import { registerUser } from '../../../../store/reducers/authSlice';
import { LoaderCircular } from '../../../../ui-kit';

import ContentMessage from 'components/ContentMessage';
import style from 'pages/general-pages/auth-pages/ConfirmEmailPage/ConfirmEmailPage.module.css';

export const ConfirmEmailPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const [emailStatus, setEmailStatus] = useState<'confirmed' | 'unconfirmed' | null>(
    null,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token)
      dispatch(registerUser({ route: 'confirmEmail', token })).then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          setEmailStatus('confirmed');
        }
        if (meta.requestStatus === 'rejected') setEmailStatus('unconfirmed');
      });
  }, [dispatch, searchParams]);

  if (!emailStatus) return <LoaderCircular />;

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {emailStatus === 'confirmed' && (
          <>
            <ContentMessage title="Email confirmed." text="" />
            You can go to
            <Link to="/"> main page</Link>
          </>
        )}
        {emailStatus === 'unconfirmed' && (
          <ContentMessage title="Email not confirmed." text="Please try again later" />
        )}
      </div>
    </div>
  );
};