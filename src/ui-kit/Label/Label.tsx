import { FC, DetailedHTMLProps, LabelHTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './Label.module.scss';

export interface ILabel
  extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  label: string;
}

export const Label: FC<ILabel> = (props): JSX.Element => {
  const { className, label, children, ...restProps } = props;

  return (
    <label className={cn(styles.label, className)} {...restProps}>
      <span className={styles.label_text}>{label}</span>
      {children}
    </label>
  );
};
