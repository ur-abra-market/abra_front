import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/buttons';
import styleBtn from '../../components/buttons/Buttons.module.css';
import Modal from '../../components/Modal';
import ChangePasswordForm from '../../components/ui/TypesView/ChangePasswordForm';

import style from './ChangePasswordPage.module.css';

const ChangePasswordPage = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const handleChangeModalActive = (): void => {
    setModalActive(prevState => !prevState);
  };

  return (
    <>
      <div className={style.page}>
        <div className={style.pageWrap}>
          <div className={style.header}>Change password</div>
          <div className={style.subheader}>Enter your current and new passwords</div>
          <div className={style.innerWrapper}>
            <ChangePasswordForm handleChangeModalActive={handleChangeModalActive} />
          </div>
        </div>
        <Link className={style.forgotPasswordlink} to="/forgotPassword">
          Forgot password?
        </Link>
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
            value="Okay"
            className={styleBtn.modalWindewBtnActive}
            // onClick={() => navigate()}
          />
        </div>
      </Modal>
    </>
  );
};

export default ChangePasswordPage;
