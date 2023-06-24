import React, { useEffect, useState } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { AuthPageLayout } from '../assets';

import style from './ResetPasswordPage.module.scss';

import { ResetPasswordForm } from '.';

import Modal from 'components/Modal';
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
    navigate('/login');
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
      <AuthPageLayout>
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
