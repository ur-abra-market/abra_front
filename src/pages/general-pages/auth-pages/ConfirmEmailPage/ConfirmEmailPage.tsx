import React, { useEffect, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../../../../common/hooks';
import { registerUser } from '../../../../store/reducers/authSlice';
import { LoaderCircular } from '../../../../ui-kit';
import { AuthPageLayout } from '../assets';

import style from './ConfirmEmailPage.module.scss';

import ContentMessage from 'components/ContentMessage';

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
    <AuthPageLayout>
      <div className={style.wrapper}>
        {emailStatus === 'confirmed' && (
          <>
            <ContentMessage title="Email confirmed." text="" />
            You can go to{' '}
            <Link className={style.link} to="/">
              main page
            </Link>
          </>
        )}
        {emailStatus === 'unconfirmed' && (
          <ContentMessage title="Email not confirmed." text="Please try again later" />
        )}
      </div>
    </AuthPageLayout>
  );
};
