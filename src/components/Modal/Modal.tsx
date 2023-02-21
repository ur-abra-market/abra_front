import React, { FC, PropsWithChildren, useEffect } from 'react';

import { createPortal } from 'react-dom';

import style from './Modal.module.css';
import cn from "classnames";

interface ModalProps {
  active: boolean;
  close?: (val: boolean) => void;
  classNameModal?:string
}
const Modal: FC<PropsWithChildren<ModalProps>> = ({ active, children, close,classNameModal }) => {
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
      className={cn(style.modal,{[style.modal_active]:active})}
      onClick={() => {
        close?.(false);
      }}
    >
      <div
        role="presentation"
        className={cn(style.modal__content, {
          [style.modal__content_active]:active,
        },
          classNameModal
          )}
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
