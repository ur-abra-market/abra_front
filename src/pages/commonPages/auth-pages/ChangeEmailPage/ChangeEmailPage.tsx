import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/Modal';
import FooterForSupplierPart from '../../../../old-components/FooterForChangePages';
import HeaderForChangePages from '../../../../old-components/HeaderForChangePages';
import ChangeEmailForm from '../../../../old-components/ui/TypesView/ChangeEmailForm';
import { Button } from '../../../../ui-kit';

import style from './ChangeEmailPage.module.css';

export const ChangeEmailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const handleChangeModalActive = (): void => {
    setModalActive(prevState => !prevState);
  };

  return (
    <>
      <HeaderForChangePages />

      <div className={style.page}>
        <div className={style.page_wrap}>
          <div className={style.header}>Change email</div>
          <div className={style.subheader}>
            Enter your current and new email addresses
          </div>
          <div className={style.inner_wrapper}>
            <ChangeEmailForm handleChangeModalActive={handleChangeModalActive} />
          </div>
        </div>
      </div>

      <FooterForSupplierPart />

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
