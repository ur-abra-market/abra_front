import React from "react";
import style from "./modal.module.css";
import PropTypes from "prop-types";

const Modal = ({active, setActive, children}) => {
    return (
        <div className={active? `${style.modal} ${style.modal_active}`: style.modal} onClick={()=>setActive(false)}>
            <div className={active? `${style.modal__content} ${style.modal__content_active}`: style.modal__content} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default Modal;

Modal.propTypes={
    children: PropTypes.node,
    setActive: PropTypes.func,
    active: PropTypes.bool,
}