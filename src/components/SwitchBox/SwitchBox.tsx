import React, { useState, useEffect, FC } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { discount } from '../../store/reducers/filterSlice';

import style from './SwitchBox.module.css';

interface SwitchBoxProps {
  label: string;
}
const SwitchBox: FC<SwitchBoxProps> = ({ label }) => {
  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);
  const [background, setBackground] = useState('#e0e0e0');
  const [justifyContent, setJustifyContent] = useState('flex-start');

  useEffect(() => {
    if (!check) {
      setBackground('#e0e0e0');
      setJustifyContent('flex-start');
    } else {
      setBackground('#000000');
      setJustifyContent('end');
    }
  }, [check]);

  const handlerSwitch = () => {
    setCheck(!check);
    switch (label) {
      case 'Only discounted items':
        dispatch(discount(!check));
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.switchBox}>
      <div className={style.switchBox__label}>{label}</div>
      <div
        className={style.switchBox__box}
        style={{ background, justifyContent }}
        onClick={() => handlerSwitch()}
      >
        <div className={style.switchBox__box_btn} />
      </div>
    </div>
  );
};

export default SwitchBox;
