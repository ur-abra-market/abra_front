import React, { FC, PropsWithChildren } from 'react';

const Form: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <form noValidate {...props}>
      {children}
    </form>
  );
};

export default Form;
