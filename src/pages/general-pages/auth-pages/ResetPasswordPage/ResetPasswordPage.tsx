import React, { useEffect, useState } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { AuthPageLayout } from '../assets';

import style from './ResetPasswordPage.module.scss';

import { ResetPasswordForm } from '.';

import Modal from 'components/Modal';
import { checkToken } from 'store/reducers/authSlice';
import { Button } from 'ui-kit';

export const ResetPasswordPage = (): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const { passwordActionsResult, userRole } = useAppSelector(state => state.auth);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const modalCloseHandler = (value: boolean): void => {
    setModalActive(value);
    switch (userRole) {
      case 'seller':
        return navigate('/personal_account');
      case 'supplier':
        return navigate('/');
      default:
        return navigate('/login');
    }
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
        {passwordActionsResult === 'TOKEN_IS_ACTIVE' && (
          <ResetPasswordForm setModalActive={setModalActive} token={token!} />
        )}
      </AuthPageLayout>
      <Modal
        showModal={modalActive}
        closeModal={modalCloseHandler}
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
            onClick={() => modalCloseHandler(false)}
          />
        </div>
      </Modal>
    </>
  );
};
