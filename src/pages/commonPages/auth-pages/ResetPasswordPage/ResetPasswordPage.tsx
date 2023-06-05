import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { AuthPageLayout } from '../assets/components/AuthPageLayout/AuthPageLayout';

import style from './ResetPasswordPage.module.scss';

import ResetPasswordForm from './index';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import Modal from 'components/Modal';
import { checkToken } from 'store/reducers/authSlice';
import { Button } from 'ui-kit';

export const ResetPasswordPage = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const [searchParams] = useSearchParams();
  const tokenStatus = useAppSelector(state => state.auth.passwordActionsResult);

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
      <AuthPageLayout>
        <div className={style.header}>Create new password</div>
        <div className={style.subheader}>
          Enter a new password that matches the criteria
        </div>
        {tokenStatus === 'TOKEN_IS_ACTIVE' && (
          <ResetPasswordForm handleChangeModalActive={handleChangeModalActive} />
        )}
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
            className={style.modal_window_btn_active}
            onClick={handleChangeModalActive}
          />
        </div>
      </Modal>
    </>
  );
};
