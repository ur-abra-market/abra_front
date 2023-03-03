import React, { FC } from 'react';

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

export default Button;
