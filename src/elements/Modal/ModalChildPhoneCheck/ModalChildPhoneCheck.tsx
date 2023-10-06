import React from 'react';

import { CrossRedIcon } from 'assets/icons';
import { Button, Input } from 'ui-kit';

import style from './ModalChildPhoneCheck.module.scss';

export const ModalChildPhoneCheck = ({ phone, setShowModal }: any): JSX.Element => {
  return (
    <>
      <div className={style.modal_wrapper}>
        <div className={style.modal_header}>Verify your phone number</div>
        <div className={style.modal_container}>
          <div className={style.modal_content}>
            <div className={style.modal_title_item}>Your phone number</div>
            <div className={style.modal_middle_item}>+{phone}</div>
            <button
              type="button"
              className={style.modal_button}
              onClick={() => setShowModal(false)}
            >
              Change
            </button>
          </div>
          <div className={style.modal_content}>
            <div className={style.modal_title_item}>Verification code</div>
            <div className={style.modal_middle_item}>
              <Input placeholder="SMS Code" />
            </div>
            <button type="button" className={style.modal_button}>
              Resend
            </button>
          </div>
        </div>
        <Button type="submit" label="Submit" form="test" />
      </div>
      <button
        type="button"
        className={style.modal_icon_plus}
        onClick={() => setShowModal(false)}
      >
        <CrossRedIcon />
      </button>
    </>
  );
};
