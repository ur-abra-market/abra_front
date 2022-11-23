import React from 'react'
import {createPortal} from 'react-dom'
import PropTypes from 'prop-types'
import style from './Modal.module.css'

const Modal = ({active, children, close}) => {
    return createPortal(
        <div
            role='presentation'
            className={active ? `${style.modal} ${style.modal_active}` : style.modal}
            onClick={() => {
                close && close(false)
            }}
        >
            <div
                className={
                    active
                        ? `${style.modal__content} ${style.modal__content_active}`
                        : style.modal__content
                }
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                {children}
            </div>
        </div>,
        document.body)
}
Modal.propTypes = {
    active: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Modal
