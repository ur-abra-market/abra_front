import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Button } from '../../components/ui-kit';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkToken } from '../../store/reducers/passwordSlice';

import Modal from 'components/new-components/Modal';
import ResetPasswordForm from 'components/ui/ResetPasswordForm';
import style from 'pages/ResetPasswordPage/ResetPasswordPage.module.css';

const ResetPasswordPage = (): JSX.Element => {
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
      <Modal showModal={modalActive} classNameModal={style.modal_container}>
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

export default ResetPasswordPage;
