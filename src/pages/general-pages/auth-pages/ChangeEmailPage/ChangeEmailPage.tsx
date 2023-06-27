import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/Modal';
import { HOME, PERSONAL_ACCOUNT } from '../../../../routes';
import { Button } from '../../../../ui-kit';
import { AuthPageLayout } from '../assets';

import style from './ChangeEmailPage.module.scss';

import { ChangeEmailForm } from '.';

import { useAppSelector } from 'common/hooks';
import { userRoleSelector } from 'store/reducers/authSlice';

export const ChangeEmailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const userRole = useAppSelector(userRoleSelector);
  const [isModalOpen, setOpenModal] = useState(false);

  const handleModalOnClose = (value: boolean): void => {
    setOpenModal(value);

    if (userRole === 'seller') {
      navigate(PERSONAL_ACCOUNT);
    } else {
      navigate(HOME);
    }
  };

  return (
    <>
      <AuthPageLayout>
        <div className={style.header}>Change email</div>
        <div className={style.subheader}>Enter your new email addresses</div>
        <ChangeEmailForm setOpenModal={setOpenModal} />
      </AuthPageLayout>

      <Modal showModal={isModalOpen} closeModal={handleModalOnClose}>
        <div className={style.modal_content_wrapper}>
          <div className={style.modal_header}>
            Your new email has been successfully saved
          </div>
          <Button
            className={style.modal_button}
            label="Okay"
            onClick={() => handleModalOnClose(false)}
          />
        </div>
      </Modal>
    </>
  );
};
