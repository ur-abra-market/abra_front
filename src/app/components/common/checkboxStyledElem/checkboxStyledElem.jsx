import { useState } from "react";
import style from "./checkboxStyledElem.module.css";

const CheckboxStyledElem = ({ size, register }) => {
  const [amount, setAmount] = useState(0);

  const [checked, setChecked] = useState(false);

  const checkboxHandler = (e) => {
    setChecked(e.target.checked);
    document.getElementById(size).focus();
  };
  return (
    <div className={style.sizeWrapper}>
      <input
        type="checkbox"
        onClick={(e) => checkboxHandler(e)}
        value={amount}
        className={style.size}
      />

      <div
        className={`${checked && style.borderContainer} ${
          style.inputContainer
        }`}
      >
        <p className={style.sizeBlock}>{size}</p>

        <input
          type="number"
          className={style.inputValue}
          {...register}
          name={size}
          placeholder={amount}
          onInput={(e) => setAmount(e.target.value)}
          id={size}
        />
      </div>
    </div>
  );
};

export default CheckboxStyledElem;
