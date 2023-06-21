import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/Modal';
import { Button } from '../../../../ui-kit';
import { AuthPageLayout } from '../assets';

import style from './ChangeEmailPage.module.scss';

import { ChangeEmailForm } from '.';

import { useAppSelector } from 'common/hooks';

export const ChangeEmailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const userRole = useAppSelector(state => state.auth.userRole);
  const [modalActive, setModalActive] = useState(false);

  const handleModalOnClose = (value: boolean): void => {
    setModalActive(value);

    if (userRole === 'seller') {
      navigate('/personal_account');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <AuthPageLayout>
        <div className={style.header}>Change email</div>
        <div className={style.subheader}>Enter your new email addresses</div>
        <ChangeEmailForm setModalActive={setModalActive} />
      </AuthPageLayout>

      <Modal showModal={modalActive} closeModal={handleModalOnClose}>
        <div className={style.modal_content_wrapper}>
          <div className={style.modal_header}>
            Your new email has been successfully saved
          </div>
          <Button
            className={style.modal_button}
            label="Okey"
            onClick={() => handleModalOnClose(false)}
          />
        </div>
      </Modal>
    </>
  );
};
