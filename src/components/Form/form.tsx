import React, { DetailedHTMLProps, FC, FormHTMLAttributes } from 'react';

interface FormProps
  extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

const Form: FC<FormProps> = ({ children, ...props }) => {
  return (
    <form noValidate {...props}>
      {children}
    </form>
  );
};

export default Form;
