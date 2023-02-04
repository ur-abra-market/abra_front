import React, { useState } from 'react';

import PropTypes from 'prop-types';

import RadioStyledElem from '../../RadioStyledElem';

import style from './RadiosFor.module.css';

const RadiosFor = ({ register, state, array, title, name, typeId }) => {
  const [choice, setChoice] = useState(state);

  return (
    <div>
      <p className={style.title}>{title}</p>
      <div className={style.radioWrapper}>
        {array &&
          array.map((el, i) => {
            return (
              <RadioStyledElem
                key={i}
                typeId={typeId}
                name={name}
                choice={choice}
                setChoice={setChoice}
                register={register}
                value={el}
              />
            );
          })}
      </div>
    </div>
  );
};

RadiosFor.propTypes = {
  register: PropTypes.func,
  state: PropTypes.string,
  array: PropTypes.array,
  title: PropTypes.string,
  name: PropTypes.string,
  typeId: PropTypes.number,
};
export default RadiosFor;
