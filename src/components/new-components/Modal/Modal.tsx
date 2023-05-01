import React, { FC, PropsWithChildren, useEffect } from 'react';

import cn from 'classnames';
import { createPortal } from 'react-dom';

import style from './Modal.module.css';

interface ModalProps {
  showModal: boolean;
  closeModal?: (value: boolean) => void;
  classNameModal?: string;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  showModal,
  children,
  closeModal,
  classNameModal,
}): JSX.Element => {
  useEffect(() => {
    const target = document.body;
    const oldWidth = target.offsetWidth;

    if (showModal) {
      target.style.overflow = 'hidden';
      target.style.width = `${oldWidth}px`;
    } else {
      target.removeAttribute('style');
    }

    return () => {
      target.removeAttribute('style');
    };
  }, [showModal]);

  return createPortal(
    showModal && (
      <div
        role="presentation"
        className={style.modal}
        onClick={() => {
          closeModal?.(false);
        }}
      >
        <div
          role="presentation"
          className={cn(style.modal_content, classNameModal)}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    ),
    document.body,
  );
};

export default Modal;
