import React, { useState } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import style from './Flag.module.css';
import { ReactComponent as FlagIcon } from './flag.svg';

const Flag = ({ className }) => {
  const [flag, setFlag] = useState(false);

  return (
    <div
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

Flag.propTypes = {
  className: PropTypes.string,
};

export default Flag;
