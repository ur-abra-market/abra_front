import React, { FC } from 'react';

import { CrossRedIcon } from 'assets/icons';
import Modal from 'elements/Modal';
import { Button, Title } from 'ui-kit';

import style from './ConfirmModalWindow.module.scss';

interface IConfirmWindow {
  title: string;
  isModalOpen: boolean;
  closeModalHandle: (flag: boolean) => void;
  confirmModalHandle: () => void;
}

export const ConfirmModalWindow: FC<IConfirmWindow> = ({
  title,
  isModalOpen,
  closeModalHandle,
  confirmModalHandle,
}): JSX.Element => {
  return (
    <Modal showModal={isModalOpen} closeModal={closeModalHandle}>
      <div className={style.modal_confirm}>
        <Title>{title}</Title>
        <div className={style.button_wrapper}>
          <Button onClick={confirmModalHandle}>Yes</Button>
          <Button onClick={() => closeModalHandle(false)}>No</Button>
        </div>
        <button
          type="button"
          className={style.cross}
          onClick={() => closeModalHandle(false)}
        >
          <CrossRedIcon />
        </button>
      </div>
    </Modal>
  );
};
