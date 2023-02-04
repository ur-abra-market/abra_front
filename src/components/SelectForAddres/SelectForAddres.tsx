import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import arrowDown from '../../assets/img/icons/select-down-arrow.svg';
import { sort, category } from '../../store/reducers/filterSlice';

import style from './SelectForAddres.module.css';

const SelectForAddres = ({ list }) => {
  const dispatch = useDispatch();

  const listPhone = ['+7', '+90'];
  const typeSort = ['rating', 'price_high_to_low)', 'price_low_to_high)'];

  const listCountry = ['Select a country', 'Russia', 'Turkey'];
  const typeCategory = ['all', 'clothes'];

  const [option, setOption] = useState(list[0]);
  const [listSwitch, setListSwitch] = useState(false);
  const styleList = {
    height: listSwitch ? 'fit-content' : '0px',
    width: list[0] === '+7' ? '166px' : '318px',
  };

  const switchList = e => {
    e.preventDefault();
    const nameClass = e.relatedTarget.className;

    if (!nameClass.includes('Select')) {
      setTimeout(() => {
        setListSwitch(false);
      }, 100);
    }
  };

  const handlerOption = (value, index) => {
    setOption(value);
    setListSwitch(!listSwitch);
    if (listPhone.includes(value)) dispatch(sort(typeSort[index]));
    if (listCountry.includes(value)) dispatch(category(typeCategory[index]));
  };

  return (
    <div className={style.select} onMouseOut={e => switchList(e)}>
      <div className={style.select__select} onClick={() => setListSwitch(!listSwitch)}>
        <div
          className={style.select_text}
          style={{
            color: option === 'Select a country' ? '#828282' : '#000000',
          }}
        >
          {option}
        </div>
        <div className={style.select_img}>
          <img src={arrowDown} alt="arrow-down" />
        </div>
      </div>
      <ul className={style.select__list} style={styleList}>
        {list.map((e, i) => (
          <li
            className={style.select__list_item}
            key={`option_${e}`}
            onClick={() => handlerOption(e, i)}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

SelectForAddres.propTypes = {
  list: PropTypes.array,
};

export default SelectForAddres;
