import React, { useState } from 'react';

import Modal from 'components/Modal';
import ResetPasswordForm from 'components/ui/ResetPasswordForm';
import style from 'pages/ResetPasswordPage/ResetPasswordPage.module.css';
import { Button } from "../../components/ui-kit";

const ResetPasswordPage = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const handleChangeModalActive = (): void => {
    setModalActive(prevState => !prevState);
  };

  return (
    <>
      <div className={style.page}>
        <div className={style.pageWrap}>
          <div className={style.header}>Create new password</div>
          <div className={style.subheader}>
            Enter a new password that matches the criteria
          </div>
          <div className={style.innerWrapper}>
            <ResetPasswordForm handleChangeModalActive={handleChangeModalActive} />
          </div>
        </div>
      </div>
        <Modal active={modalActive}>
          <div className={style.modalContentWrapper}>
            <div className={style.modalHeader}>
              Your new password has been successfully saved
            </div>
            <div className={style.modalSubHeader}>
              Now you can log in with your new password
            </div>
            <Button
              label="Okay"
              className={style.modal_window_btn_active}
              onClick={handleChangeModalActive}
            />
          </div>
        </Modal>

    </>
  );
};

export default ResetPasswordPage;
