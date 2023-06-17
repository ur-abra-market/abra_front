import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/Modal';
import { Button } from '../../../../ui-kit';
import { AuthPageLayout } from '../assets';

import style from './ChangePasswordPage.module.scss';

import { ChangePasswordForm } from '.';

import { useAppSelector } from 'common/hooks';

export const ChangePasswordPage = (): JSX.Element => {
  const navigate = useNavigate();
  const userRole = useAppSelector(state => state.auth.userRole);
  const [modalActive, setModalActive] = useState(false);

  const modalCloseHandler = (value: boolean): void => {
    setModalActive(value);

    if (userRole === 'seller') {
      navigate('/personal_account');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <AuthPageLayout footerLink="/forgot_password" footerTitle="Forgot password?">
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
