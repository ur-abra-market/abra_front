import React, { FC, PropsWithChildren } from 'react';

interface ButtonLinkProps {
  name?: string;
  src?: string;
  classes?: any;
}
const ButtonLink: FC<PropsWithChildren<ButtonLinkProps>> = (props): JSX.Element => {
  const { name, src, classes, children } = props;

  return (
    <div className={classes.wrepperButtonLink}>
      <div className={classes.wrepperBtnImg}>
        {children}
        <img className={classes.btnImg} src={src} alt="btn-header" />
      </div>
      <div className={classes.btnName}>{name}</div>
    </div>
  );
};

export default ButtonLink;
