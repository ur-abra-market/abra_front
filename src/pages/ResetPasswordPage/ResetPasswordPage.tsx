import React, { useState } from 'react';

import { Button } from 'components/common/buttons';
import styleBtn from 'components/common/buttons/buttons.module.css';
import Modal from 'components/common/Modal';
import ResetPasswordForm from 'components/ui/ResetPasswordForm';
import style from 'pages/ResetPasswordPage/ResetPasswordPage.module.css';

const ResetPasswordPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const handleChangeModalActive = () => {
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
            value="Okay"
            className={styleBtn.modalWindewBtnActive}
            onClick={handleChangeModalActive}
          />
        </div>
      </Modal>
    </>
  );
};

export default ResetPasswordPage;
