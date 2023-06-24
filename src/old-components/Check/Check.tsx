import { FC, useEffect, useState } from 'react';

import style from './Check.module.scss';

import { CheckMarkWhiteIcon } from 'assets/icons';

interface CheckProps {
  label?: string;
}
const Check: FC<CheckProps> = ({ label }): JSX.Element => {
  const [check, setCheck] = useState(false);
  const [background, setBackground] = useState('');

  useEffect(() => {
    if (!check) setBackground('#F4F4F4');
    else setBackground('#FC133D');
  }, [check]);

  const handlerCheck = (): void => {
    setCheck(!check);
    switch (label) {
      case 'Main Address':
        setCheck(!check);
        break;
      default:
        break;
    }
  };

  return (
    <div role="presentation" className={style.check} onClick={() => handlerCheck()}>
      <div className={style.check_box} style={{ background }}>
        {check && <CheckMarkWhiteIcon className={style.check_box_mark} />}
      </div>
      <div className={style.check_label}>{label}</div>
    </div>
  );
};

export default Check;
