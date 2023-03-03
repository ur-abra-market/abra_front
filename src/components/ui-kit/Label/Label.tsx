import { FC } from 'react';

import cn from 'classnames';

import styles from './Label.module.css';
import { LabelProps } from './Label.props';

export const Label: FC<LabelProps> = (props): JSX.Element => {
  const { className, label, children, ...restProps } = props;

  return (
    <label className={cn(styles.label, className)} {...restProps}>
      <span className={styles.label_text}>{label}</span>
      {children}
    </label>
  );
};
