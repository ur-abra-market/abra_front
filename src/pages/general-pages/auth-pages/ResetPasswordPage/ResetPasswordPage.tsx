import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { checkToken } from '../../../../store/reducers/passwordSlice';
import { Button } from '../../../../ui-kit';

import style from './ResetPasswordPage.module.css';

import Modal from 'components/Modal';
import ResetPasswordForm from 'old-components/ui/ResetPasswordForm';

export const ResetPasswordPage = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const [searchParams] = useSearchParams();
  const tokenStatus = useAppSelector(state => state.passwordSlice.result);

  const token = searchParams.get('token');
  const dispatch = useAppDispatch();
  const handleChangeModalActive = (): void => {
    setModalActive(prevState => !prevState);
  };

  useEffect(() => {
    dispatch(checkToken(token!));
  }, [dispatch, token]);

  return (
    <>
      <div className={style.page}>
        <div className={style.page_wrap}>
          <div className={style.header}>Create new password</div>
          <div className={style.subheader}>
            Enter a new password that matches the criteria
          </div>
          <div className={style.inner_wrapper}>
            {tokenStatus === 'TOKEN_IS_ACTIVE' && (
              <ResetPasswordForm handleChangeModalActive={handleChangeModalActive} />
            )}
          </div>
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
            className={style.modal_window_btn_active}
            onClick={handleChangeModalActive}
          />
        </div>
      </Modal>
    </>
  );
};
