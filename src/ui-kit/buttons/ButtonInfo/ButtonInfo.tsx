import { FC } from 'react';

import cn from 'classnames';

import styles from './ButtonInfo.module.scss';

import { ContactUsQuestionMarkIcon } from 'assets/icons';

export interface IButtonInfo {
  className?: string;
}

export const ButtonInfo: FC<IButtonInfo> = ({ className }): JSX.Element => {
  return (
    <a
      className={cn(styles.link, className)}
      href="https://wa.me/79119681844?text=Hi%2C%20"
      target="_blank"
      rel="noreferrer"
    >
      <ContactUsQuestionMarkIcon className={styles.icon} />
    </a>
  );
};
