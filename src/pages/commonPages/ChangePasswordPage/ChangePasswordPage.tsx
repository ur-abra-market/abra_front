import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Modal from '../../../components/Modal';
import ChangePasswordForm from '../../../old-components/ui/TypesView/ChangePasswordForm';
import { Button } from '../../../ui-kit';

import style from './ChangePasswordPage.module.css';

const ChangePasswordPage = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const handleChangeModalActive = (): void => {
    setModalActive(prevState => !prevState);
  };

  return (
    <>
      <div className={style.page}>
        <div className={style.page_wrap}>
          <div className={style.header}>Change password</div>
          <div className={style.subheader}>Enter your current and new passwords</div>
          <div className={style.inner_wrapper}>
            <ChangePasswordForm handleChangeModalActive={handleChangeModalActive} />
          </div>
          <Link className={style.link_forgot} to="/forgotPassword">
            Forgot password?
          </Link>
        </div>
      </div>

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

export default ChangePasswordPage;
