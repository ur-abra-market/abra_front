import React, { FC } from 'react';

import PropTypes from 'prop-types';

interface ButtonProps {
  value?: string;
  className?: string;
  onClick?: any;
  disabled?: boolean;
}
const Button: FC<ButtonProps> = ({
  value = 'Default Button',

  className = '',
  onClick,
  disabled = false,
  ...attrs
}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...attrs} className={className} disabled={disabled} onClick={onClick}>
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  value: 'Default Button',
  className: '',
  disabled: false,
};

export default Button;
