import React, { useState } from 'react';

import arrowDown from '../../assets/img/icons/arrow-down.png';

import style from './SelectShip.module.css';

const SelectShip = (): JSX.Element => {
  const [option, setOption] = useState('Ship to');
  const [list, setList] = useState(false);
  const styleList = {
    height: list ? 'fit-content' : '0px',
  };

  return (
    <div className={style.header__ship}>
      <div
        role="presentation"
        className={style.ship_select}
        onClick={() => setList(!list)}
      >
        <div className={style.select_text}>{option}</div>
        <div className={style.select_img}>
          <img src={arrowDown} alt="arrow-down" />
        </div>
      </div>
      <ul className={style.ship_list_options} style={styleList}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={style.ship_option}
          onClick={() => {
            setOption('Ship to');
            setList(!list);
          }}
        >
          Ship to
        </li>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={style.ship_option}
          onClick={() => {
            setOption('Ship from');
            setList(!list);
          }}
        >
          Ship from
        </li>
      </ul>
    </div>
  );
};

export default SelectShip;
