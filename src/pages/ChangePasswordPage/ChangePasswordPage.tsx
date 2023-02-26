import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Modal from '../../components/Modal';
import ChangePasswordForm from '../../components/ui/TypesView/ChangePasswordForm';

import style from './ChangePasswordPage.module.css';
import { Button } from "../../components/ui-kit";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const handleChangeModalActive = () => {
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

      <Modal active={modalActive}  classNameModal={style.modal_container}>
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
