import React, { useState } from 'react';

import arrowDown from '../../assets/img/icons/arrow-down.png';

import style from './SelectCurrency.module.css';

const SelectCurrency = (): JSX.Element => {
  const [option, setOption] = useState('English / USD');
  const [list, setList] = useState(false);
  const styleList = {
    height: list ? 'fit-content' : '0px',
  };

  return (
    <div className={style.header__currency}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={style.currency_select} onClick={() => setList(!list)}>
        <div className={style.select_text}>{option}</div>
        <div className={style.select_img}>
          <img src={arrowDown} alt="arrow-down" />
        </div>
      </div>
      <ul className={style.currency_list_options} style={styleList}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={style.currency_option}
          onClick={() => {
            setOption('English / USD');
            setList(!list);
          }}
        >
          English / USD
        </li>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={style.currency_option}
          onClick={() => {
            setOption('Russian / RUB');
            setList(!list);
          }}
        >
          Russian / RUB
        </li>
      </ul>
    </div>
  );
};

export default SelectCurrency;
