import React, { useState, useEffect, FC } from 'react';

import { useDispatch } from 'react-redux';

import { discount } from '../../store/reducers/filterSlice';

import style from './SwitchBox.module.scss';

interface SwitchBoxProps {
  label: string;
}
const SwitchBox: FC<SwitchBoxProps> = ({ label }): JSX.Element => {
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

  const handlerSwitch = (): void => {
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
    <div className={style.switch_box}>
      <div className={style.switch_box_label}>{label}</div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={style.switch_box_box}
        style={{ background, justifyContent }}
        onClick={() => handlerSwitch()}
      >
        <div className={style.switch_box_box_btn} />
      </div>
    </div>
  );
};

export default SwitchBox;
