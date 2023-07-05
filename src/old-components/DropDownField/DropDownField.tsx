import { FC, PropsWithChildren } from 'react';

import cn from 'classnames';

import style from './DropDownField.module.scss';

import { ArrowIcon } from 'assets/icons'; // 5 10px
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

        <ArrowIcon className={cn({ [style.arrow_up]: open })} />
      </div>

      {open === id && <div className={style.children}>{children}</div>}
    </div>
  );
};

export default DropDownField;
