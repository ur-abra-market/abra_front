import React, { FC, PropsWithChildren, useEffect } from 'react';

import { createPortal } from 'react-dom';

import style from './Modal.module.css';
import { Button } from "../buttons";
import styleBtn from "../buttons/Buttons.module.css";

interface ModalProps {
  active: boolean;
  close?: (val: boolean) => void;
}
const Modal: FC<PropsWithChildren<ModalProps>> = ({ active, children, close }) => {
  useEffect(() => {
    const target = document.body;

    const oldWidth = target.offsetWidth;

    target.style.overflow = 'hidden';
    target.style.width = `${oldWidth}px`;

    return () => target.removeAttribute('style');
  }, []);

  return createPortal(
    <div
      role="presentation"
      className={active ? `${style.modal} ${style.modal_active}` : style.modal}
      onClick={() => {
        close?.(false);
      }}
    >
      <Button
        value='X'
        className={styleBtn.modalWindewBtnClose}

      />
      <div
        role="presentation"
        className={
          active
            ? `${style.modal__content} ${style.modal__content_active}`
            : style.modal__content
        }
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {children}

      </div>
    </div>,
    document.body,
  );
};

export default Modal;
