import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/Modal';
import { AuthPageLayout } from '../assets';

import style from './ChangeEmailPage.module.scss';

import ChangeEmailForm from '.';

import { Button } from 'ui-kit';

export const ChangeEmailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const handleChangeModalActive = (): void => {
    setModalActive(prevState => !prevState);
  };

  return (
    <>
      <AuthPageLayout>
        <div className={style.page_wrap}>
          <div className={style.header}>Change email</div>
          <div className={style.subheader}>
            Enter your current and new email addresses
          </div>
          <ChangeEmailForm handleChangeModalActive={handleChangeModalActive} />
        </div>
      </AuthPageLayout>

      <Modal showModal={modalActive} closeModal={setModalActive}>
        <div className={style.modal_content_wrapper}>
          <div className={style.modal_header}>
            Your new email has been successfully saved
          </div>
          <Button value="Okay" onClick={() => navigate('/')} />
        </div>
      </Modal>
    </>
  );
};
