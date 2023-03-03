import React, { FC } from 'react';

import cn from 'classnames';

import styles from './InfoBtn.module.css';
import { InfoBtnProps } from './InfoBtn.props';

const InfoBtn: FC<InfoBtnProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

  return (
    <button type="button" className={cn(styles.button, className)} {...restProps}>
      <div className={styles.icon} />
    </button>
  );
};

export default InfoBtn;
