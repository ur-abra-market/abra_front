import React, { FC } from 'react';

import cn from 'classnames';

import { useAppDispatch } from '../../../store/hooks';
import { toggleInfoForm } from '../../../store/reducers/app';

import styles from './InfoBtn.module.css';
import { InfoBtnProps } from './InfoBtn.props';

const InfoBtn: FC<InfoBtnProps> = (props): JSX.Element => {
  const { className, ...restProps } = props;

  const dispatch = useAppDispatch();

  const openInfoForm = (): void => {
    dispatch(toggleInfoForm());
  };

  return (
    <button
      type="button"
      className={cn(styles.button, className)}
      onClick={openInfoForm}
      {...restProps}
    >
      <div className={styles.icon} />
    </button>
  );
};

export default InfoBtn;
