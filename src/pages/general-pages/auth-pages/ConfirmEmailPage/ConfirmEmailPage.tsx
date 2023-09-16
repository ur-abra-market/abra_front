import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import style from './ConfirmEmailPage.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { ContentMessage } from 'elements';
import { AuthPageLayout } from 'pages/general-pages/auth-pages/assets';
import { LOGIN } from 'routes';
import { confirmEmail } from 'store/reducers/authSlice';
import { LoaderCircular } from 'ui-kit';

export const ConfirmEmailPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  const [emailStatus, setEmailStatus] = useState<'confirmed' | 'unconfirmed' | null>(
    null,
  );

  useEffect(() => {
    const token = searchParams.get('token');

    if (token)
      dispatch(confirmEmail({ token })).then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          setEmailStatus('confirmed');
        }
        if (meta.requestStatus === 'rejected') setEmailStatus('unconfirmed');
      });
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (isAuthorized) navigate(-1);
  }, [isAuthorized]);

  if (!emailStatus) return <LoaderCircular />;

  return (
    <AuthPageLayout>
      <div className={style.wrapper}>
        {emailStatus === 'confirmed' && (
          <>
            <ContentMessage title="Email confirmed." text="" />
            Now you can&nbsp;
            <Link className={style.link} to={LOGIN}>
              log in
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
