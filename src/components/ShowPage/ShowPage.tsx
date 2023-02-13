import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import arrowDown from '../../assets/img/icons/arrow-slide-down.svg';
import { amount } from '../../store/reducers/paginateSlice';

import style from './ShowPage.module.css';

const ShowPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const list = ['20', '40', '60', '80', '100'];
  const [option, setOption] = useState(list[0]);
  const [listSwitch, setListSwitch] = useState(false);
  const styleList = {
    height: listSwitch ? 'fit-content' : '0px',
  };

  const switchList = (e: any): void => {
    e.preventDefault();
    const nameClass = e.relatedTarget.className;

    // TODO !!!!!
    if (!nameClass.includes('ShowPage')) {
      setTimeout(() => {
        setListSwitch(false);
      }, 100);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div className={style.ShowPage} onMouseOut={e => switchList(e)}>
      <div className={style.ShowPage__select}>
        <div className={style.ShowPage_text}>{`Show by ${option}`}</div>
        <div
          role="presentation"
          className={style.ShowPage_img}
          onClick={() => setListSwitch(!listSwitch)}
        >
          <img src={arrowDown} alt="arrow-down" />
        </div>
      </div>
      <ul className={style.ShowPage__list} style={styleList}>
        {list.map(e => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            className={style.ShowPage__list_item}
            key={`option_${e}`}
            onClick={() => {
              setOption(e);
              setListSwitch(!listSwitch);
              dispatch(amount(+e));
            }}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowPage;
