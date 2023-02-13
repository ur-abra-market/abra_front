import React, { FC, useState } from 'react';

import cn from 'classnames';

import style from './Flag.module.css';
import { ReactComponent as FlagIcon } from './flag.svg';

interface FlagProps {
  className?: string;
}
const Flag: FC<FlagProps> = ({ className }): JSX.Element => {
  const [flag, setFlag] = useState(false);

  return (
    <div
      role="presentation"
      className={cn(style.flag, className)}
      onClick={e => {
        e.stopPropagation();
        setFlag(!flag);
      }}
    >
      <FlagIcon className={flag ? style.active : ''} />
    </div>
  );
};

export default Flag;
