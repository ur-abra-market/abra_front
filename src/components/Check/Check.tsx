import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { main } from '../../store/reducers/modalSlice';

import style from './Check.module.css';

const Check = ({ label }) => {
  const [check, setCheck] = useState(false);
  const [background, setBackground] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!check) setBackground('#dddddd');
    else setBackground('#000000');
  }, [check]);

  const handlerCheck = () => {
    setCheck(!check);
    switch (label) {
      case 'Main Address':
        dispatch(main(!check));
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.check} onClick={() => handlerCheck()}>
      <div className={style.check__box} style={{ background }}>
        {check ? <div className={style.check__box_mark} /> : <></>}
      </div>
      <div className={style.check__label}>{label}</div>
    </div>
  );
};

Check.propTypes = {
  label: PropTypes.string,
};
export default Check;
