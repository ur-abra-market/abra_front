import { FC, PropsWithChildren } from 'react';

import style from './DropDownField.module.scss';

import { ArrowRightIcon } from 'assets/icons'; // 5 10px
import styles from 'ui-kit/Select/Select.module.scss';

interface DropDownFieldProps {
  title: string;
  /* isShow: boolean; */
  id: number;
  open: number | null;
  setOpen: (value: number | null) => void;
  /* foo?: (value: boolean) => void; */
}
const DropDownField: FC<PropsWithChildren<DropDownFieldProps>> = ({
  children,
  title,
  id,
  open,
  setOpen,
}): JSX.Element => {
  const onClick = (accordionNum: number): void => {
    setOpen(open === accordionNum ? null : accordionNum);
  };

  return (
    <div>
      <div role="presentation" className={style.title} onClick={() => onClick(id)}>
        <p className={style.title_text}>{title}</p>
        <span className={open ? style.arrow_on : style.arrow_off}>
          <ArrowRightIcon className={styles.arrow} />
        </span>
      </div>

      {open === id && <div className={style.children}>{children}</div>}
    </div>
  );
};

export default DropDownField;
