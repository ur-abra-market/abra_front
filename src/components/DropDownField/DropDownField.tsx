import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import { ReactComponent as Arrow } from '../../assets/img/icons/arrowRight.svg';
import styles from '../ui-kit/Select/Select.module.css';

import style from './DropDownField.module.css';

interface DropDownFieldProps {
  title: string;
  isShow: boolean;
}
const DropDownField: FC<PropsWithChildren<DropDownFieldProps>> = ({
  children,
  title,
  isShow,
}): JSX.Element => {
  const [open, setOpen] = useState(false);

  const onClick = (): void => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isShow && !open) {
      setOpen(!open);
    }
  }, [isShow, open]);

  return (
    <div>
      <div role="presentation" className={style.title} onClick={onClick}>
        <p className={style.title_text}>{title}</p>
        <span className={open ? style.arrow_on : style.arrow_off}>
          <Arrow className={styles.arrow} />
        </span>
      </div>

      {open && <div className={style.children}>{children}</div>}
    </div>
  );
};

export default DropDownField;
