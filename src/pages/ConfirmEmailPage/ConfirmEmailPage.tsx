import React, { useEffect, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import Loader from '../../components/Loader';

import ContentMessage from 'components/ContentMessage';
import style from 'pages/ConfirmEmailPage/ConfirmEmailPage.module.css';
import { useAppDispatch } from 'store/hooks';
import { clearState, registerService } from 'store/reducers/registerSlice';

const ConfirmEmailPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const [emailStatus, setEmailStatus] = useState<'confirmed' | 'unconfirmed' | null>(
    null,
  );

  useEffect(() => {
    const token = searchParams.get('token');

    if (token)
      dispatch(registerService({ route: 'confirmEmail', token })).then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          setEmailStatus('confirmed');
        }
        if (meta.requestStatus === 'rejected') setEmailStatus('unconfirmed');
        dispatch(clearState());
      });
  }, [dispatch, searchParams]);

  if (!emailStatus) return <Loader />;

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

export default ConfirmEmailPage;
