import React, { FC, useState } from 'react';

import RadioStyledElem from '../../RadioStyledElem';

import style from './RadiosFor.module.css';

interface RadiosForProps {
  register: any;
  state: any;
  array: any;
  title: string;
  name: string;
  typeId: number;
}
const RadiosFor: FC<RadiosForProps> = ({
  register,
  state,
  array,
  title,
  name,
  typeId,
}) => {
  const [choice, setChoice] = useState(state);

  return (
    <div>
      <p className={style.title}>{title}</p>
      <div className={style.radioWrapper}>
        {array &&
          array.map((el: any, i: number) => {
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

export default RadiosFor;
