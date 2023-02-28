import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/buttons';
import styleBtn from '../../components/buttons/Buttons.module.css';
import FooterForSupplierPart from '../../components/FooterForChangePages';
import HeaderForChangePages from '../../components/HeaderForChangePages';
import Modal from '../../components/Modal';
import ChangeEmailForm from '../../components/ui/TypesView/ChangeEmailForm';

import style from './ChangeEmailPage.module.css';

const ChangeEmailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const handleChangeModalActive = (): void => {
    setModalActive(prevState => !prevState);
  };

  return (
    <>
      <HeaderForChangePages />

      <div className={style.page}>
        <div className={style.pageWrap}>
          <div className={style.header}>Change email</div>
          <div className={style.subheader}>
            Enter your current and new email addresses
          </div>
          <div className={style.innerWrapper}>
            <ChangeEmailForm handleChangeModalActive={handleChangeModalActive} />
          </div>
        </div>
      </div>

      <FooterForSupplierPart />

      <Modal active={modalActive}>
        <div className={style.modalContentWrapper}>
          <div className={style.modalHeader}>
            Your new email has been successfully saved
          </div>
          <Button
            value="Okay"
            className={styleBtn.modalWindewBtnActive}
            onClick={() => navigate('/')}
          />
        </div>
      </Modal>
    </>
  );
};

export default ChangeEmailPage;
