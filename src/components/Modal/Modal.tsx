import React, { FC, PropsWithChildren } from 'react';

import { createPortal } from 'react-dom';

import style from './Modal.module.css';

interface ModalProps {
  active: boolean;
  close?: (val: boolean) => void;
}
const Modal: FC<PropsWithChildren<ModalProps>> = ({ active, children, close }) => {
  return createPortal(
    <div
      role="presentation"
      className={active ? `${style.modal} ${style.modal_active}` : style.modal}
      onClick={() => {
        close?.(false);
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
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
