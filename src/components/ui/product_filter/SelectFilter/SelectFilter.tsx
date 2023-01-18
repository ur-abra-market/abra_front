import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import arrowDown from '../../../../assets/img/icons/arrow-down.png';
import { sort, category } from '../../../../store/reducers/filterSlice';

import style from './SelectFilter.module.css';

const SelectFilter = ({ list }) => {
  const dispatch = useDispatch();

  const listSort = [
    'Sort By Rating',
    'Sort By Price (From High to Low)',
    'Sort By Price (From Low to High)',
  ];
  const typeSort = ['rating', 'price_high_to_low)', 'price_low_to_high)'];

  const listCategory = ['All Categories', 'Clothes and Accessories'];
  const typeCategory = ['all', 'clothes'];

  const [option, setOption] = useState(list[0]);
  const [listSwitch, setListSwitch] = useState(false);
  const styleList = {
    height: listSwitch ? 'fit-content' : '0px',
  };
  const basic = option.split(/[()]/)[0];
  const remains = option.split(/[()]/)[1];

  const switchList = e => {
    e.preventDefault();
    const nameClass = e.relatedTarget.className;

    if (!nameClass.includes('SelectFilter')) {
      setTimeout(() => {
        setListSwitch(false);
      }, 100);
    }
  };

  const handlerOption = (value, index) => {
    setOption(value);
    setListSwitch(!listSwitch);
    if (listSort.includes(value)) dispatch(sort(typeSort[index]));
    if (listCategory.includes(value)) dispatch(category(typeCategory[index]));
  };

  return (
    <div className={style.selectFilter} onMouseOut={e => switchList(e)}>
      <div
        className={style.selectFilter__select}
        onClick={() => setListSwitch(!listSwitch)}
      >
        <div className={style.selectFilter_text}>
          <div>{basic}</div>
          <div className={style.selectFilter_text_remains}>
            {remains ? `(${remains})` : ''}
          </div>
        </div>
        <div className={style.selectFilter_img}>
          <img src={arrowDown} alt="arrow-down" />
        </div>
      </div>
      <ul className={style.selectFilter__list} style={styleList}>
        {list.map((e, i) => (
          <li
            className={style.selectFilter__list_item}
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

SelectFilter.propTypes = {
  list: PropTypes.array,
};
export default SelectFilter;
