import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/Modal';
import { Button } from '../../../../ui-kit';
import { AuthPageLayout } from '../assets';

import style from './ChangePasswordPage.module.scss';

import { ChangePasswordForm } from '.';

export const ChangePasswordPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [modalActive, setModalActive] = useState(false);
  const modalCloseHandler = (value: boolean): void => {
    setModalActive(value);
    navigate('/');
  };

  return (
    <>
      <AuthPageLayout footerLink="/forgotPassword" footerTitle="Forgot password?">
        <div className={style.header}>Change password</div>
        <div className={style.subheader}>Enter your current and new passwords</div>
        <ChangePasswordForm setModalActive={setModalActive} />
      </AuthPageLayout>

      <Modal
        showModal={modalActive}
        closeModal={modalCloseHandler}
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
            className={style.button_modal}
            onClick={() => modalCloseHandler(false)}
          />
        </div>
      </Modal>
    </>
  );
};
