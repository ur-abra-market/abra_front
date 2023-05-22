import React, { FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import cn from 'classnames';

import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { toggleInfoForm } from '../../../store/reducers/appSlice';

import styles from './ButtonInfo.module.css';

export interface IButtonInfo
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'children'
  > {}

export const ButtonInfo: FC<IButtonInfo> = ({ className, ...restProps }): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className={cn(styles.button, className)}
      onClick={() => dispatch(toggleInfoForm())}
      {...restProps}
    >
      <div className={styles.icon} />
    </button>
  );
};
