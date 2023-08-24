import { FC, ButtonHTMLAttributes, DetailedHTMLProps, useCallback } from 'react';

import cn from 'classnames';

import styles from './ButtonInfo.module.scss';

import { ContactUsQuestionMarkIcon } from 'assets/icons';

export interface IButtonInfo
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'children'
  > {}
export const ButtonInfo: FC<IButtonInfo> = ({ className, ...restProps }): JSX.Element => {
  const handleClickLink = useCallback(() => {
    const link = document.createElement('a');

    link.href = 'https://wa.me/79119681844?text=Hi%2C%20';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <button
      type="button"
      className={cn(styles.button, className)}
      onClick={handleClickLink}
      {...restProps}
    >
      <ContactUsQuestionMarkIcon className={styles.icon} />
    </button>
  );
};
