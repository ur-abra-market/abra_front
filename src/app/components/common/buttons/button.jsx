import React from "react";
import PropTypes from "prop-types";

const Button = ({ value, className, onClick, disabled, active, ...attrs }) => {
  return (
    <button
      {...attrs}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

Button.defaultProps = {
  value: "Default Button",
  className: "",
  disabled: false,
  active: false,
};

export default Button;
