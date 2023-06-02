import React, { useState } from 'react';

import Modal from '../../../../components/Modal';
import { Button } from '../../../../ui-kit';
import { AuthPageLayout } from '../assets/components/AuthPageLayout/AuthPageLayout';

import style from './ChangePasswordPage.module.scss';

import ChangePasswordForm from './index';

export const ChangePasswordPage = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const handleChangeModalActive = (): void => {
    setModalActive(prevState => !prevState);
  };

  return (
    <>
      <AuthPageLayout footerLink="/forgotPassword" footerTitle="Forgot password?">
        <div className={style.page_wrap}>
          <div className={style.header}>Change password</div>
          <div className={style.subheader}>Enter your current and new passwords</div>
          <ChangePasswordForm handleChangeModalActive={handleChangeModalActive} />
        </div>
      </AuthPageLayout>

      <Modal
        showModal={modalActive}
        closeModal={setModalActive}
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
            onClick={handleChangeModalActive}
          />
        </div>
      </Modal>
    </>
  );
};
