import React, { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import style from './ResetPasswordPage.module.scss';

import { ResetPasswordForm } from '.';

import { useAppDispatch } from 'common/hooks';
import Modal from 'elements/Modal';
import { AuthPageLayout } from 'pages/general-pages/auth-pages/assets';
import { LOGIN } from 'routes';
import { checkToken } from 'store/reducers/authSlice';
import { Button } from 'ui-kit';

export const ResetPasswordPage = (): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTokenActive, setTokenActive] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalOnClose = (value: boolean): void => {
    setModalOpen(value);
    navigate(LOGIN);
  };

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(checkToken(token!));

      if (checkToken.fulfilled.match(actionResult)) {
        setTokenActive(true);
      }
    })();
  }, [dispatch, token]);

  return (
    <>
      <AuthPageLayout withHeader>
        <div className={style.header}>Create new password</div>
        <div className={style.subheader}>
          Enter a new password that matches the criteria
        </div>
        {isTokenActive && (
          <ResetPasswordForm setModalOpen={setModalOpen} token={token!} />
        )}
      </AuthPageLayout>
      <Modal
        showModal={isModalOpen}
        closeModal={handleModalOnClose}
        classNameModal={style.modal_container}
      >
        <div className={style.modal_content_wrapper}>
          <div className={style.modal_header}>
            Your new password has been successfully saved
          </div>
          <div className={style.modal_sub_header}>
            Now you can log in with your new password
          </div>
          <Button
            label="Okay"
            className={style.modal_window_btn_active}
            onClick={() => handleModalOnClose(false)}
          />
        </div>
      </Modal>
    </>
  );
};
