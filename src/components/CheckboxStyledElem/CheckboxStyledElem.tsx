import React, { ChangeEvent, FC, useState } from 'react';

import style from './CheckboxStyledElem.module.css';

interface CheckboxStyledElemProps {
  register: any;
  size: string;
  typeId: number;
}
const CheckboxStyledElem: FC<CheckboxStyledElemProps> = ({
  size,
  register,
  typeId,
}): JSX.Element => {
  const [amount, setAmount] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);

  const checkboxHandler = (e: ChangeEvent<any>): void => {
    setChecked(e.target.checked);
    // TODO переделать!!!!!!
    // document.getElementById(size + typeId).focus();
  };

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(+e.target.value);
  };

  return (
    <div className={style.sizeWrapper}>
      <input
        type="checkbox"
        onClick={e => checkboxHandler(e)}
        value={amount}
        className={style.size}
      />

      <div className={`${checked && style.borderContainer} ${style.inputContainer}`}>
        <p className={style.sizeBlock}>{size}</p>

        <input
          type="number"
          className={style.inputValue}
          {...register}
          placeholder={amount.toString()}
          onInput={onInputHandler}
          id={size + typeId}
        />
      </div>
    </div>
  );
};

export default CheckboxStyledElem;
