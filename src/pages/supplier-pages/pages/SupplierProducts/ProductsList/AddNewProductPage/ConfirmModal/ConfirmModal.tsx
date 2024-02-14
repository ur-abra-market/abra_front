import React, { FC } from 'react';

import { CrossRedIcon } from 'assets/icons';
import Modal from 'elements/Modal';
import { Button, Paragraph } from 'ui-kit';

import style from './ConfirmModal.module.scss';

interface IConfirmWindow {
  title: string;
  isModalOpen: boolean;
  closeModalHandle: (flag: boolean) => void;
  confirmModalHandle: () => void;
}

export const ConfirmModal: FC<IConfirmWindow> = ({
  title,
  isModalOpen,
  closeModalHandle,
  confirmModalHandle,
}): JSX.Element => {
  return (
    <Modal showModal={isModalOpen} closeModal={closeModalHandle}>
      <div className={style.modal_confirm_wrapper}>
        <div className={style.header_confirm}>
          <Paragraph size="m" weight="regular">
            {title}
          </Paragraph>

          <button
            type="button"
            className={style.cross}
            onClick={() => closeModalHandle(false)}
          >
            <CrossRedIcon />
          </button>
        </div>

        <div className={style.button_wrapper}>
          <Button className={style.button_cancel} onClick={() => closeModalHandle(false)}>
            Cancel
          </Button>

          <Button className={style.button_delete} onClick={confirmModalHandle}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
