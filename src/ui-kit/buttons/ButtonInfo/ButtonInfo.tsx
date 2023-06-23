import { FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import cn from 'classnames';

import { useAppDispatch } from '../../../common/hooks';

import styles from './ButtonInfo.module.scss';

import { ContactUsQuestionMarkIcon } from 'assets/icons';
import { toggleInfoForm } from 'store/reducers/appSlice/slice';

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
      <ContactUsQuestionMarkIcon className={styles.icon} />
    </button>
  );
};
