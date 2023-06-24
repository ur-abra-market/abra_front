import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/Modal';
import { FORGOT_PASSWORD } from '../../../../routes';
import { userRoleSelector } from '../../../../store/reducers/authSlice';
import { Button } from '../../../../ui-kit';
import { AuthPageLayout } from '../assets';

import style from './ChangePasswordPage.module.scss';

import { ChangePasswordForm } from '.';

import { useAppSelector } from 'common/hooks';

export const ChangePasswordPage = (): JSX.Element => {
  const navigate = useNavigate();
  const userRole = useAppSelector(userRoleSelector);
  const [isModalOpen, setOpenModal] = useState(false);

  const handleModalOnClose = (value: boolean): void => {
    setOpenModal(value);

    if (userRole === 'seller') {
      navigate('/personal_account');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <AuthPageLayout footerLink={FORGOT_PASSWORD} footerTitle="Forgot password?">
        <div className={style.header}>Change password</div>
        <div className={style.subheader}>Enter your current and new passwords</div>
        <ChangePasswordForm setOpenModal={setOpenModal} />
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
            className={style.button_modal}
            onClick={() => handleModalOnClose(false)}
          />
        </div>
      </Modal>
    </>
  );
};
