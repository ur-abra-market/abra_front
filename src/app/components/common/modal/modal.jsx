import React from "react";
import PropTypes from "prop-types";
import style from "./modal.module.css";

const Modal = ({ active, children }) => {
  return (
    <div
      className={active ? `${style.modal} ${style.modal_active}` : style.modal}
    >
      <div
        className={
          active
            ? `${style.modal__content} ${style.modal__content_active}`
            : style.modal__content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
Modal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default Modal;
