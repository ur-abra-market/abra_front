import React, { FC, PropsWithChildren, useEffect } from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames'
import { createPortal } from 'react-dom'

import style from './Modal.module.css'

interface ModalProps {
  active: boolean
  close?: (val: boolean) => void
  classNameModal?: string
}
const Modal: FC<PropsWithChildren<ModalProps>> = ({
  active,
  children,
  close,
  classNameModal
}): JSX.Element => {
  useEffect(() => {
    const target = document.body

    const oldWidth = target.offsetWidth

    target.style.overflow = 'hidden'
    target.style.width = `${oldWidth}px`

    return () => target.removeAttribute('style')
  }, [])

  return createPortal(
    <div
      role="presentation"
      className={cn(style.modal, { [style.modal_active]: active })}
      onClick={() => {
        close?.(false)
      }}
    >
      <div
        role="presentation"
        className={cn(
          style.modal_content,
          {
            [style.modal_content_active]: active
          },
          classNameModal
        )}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
