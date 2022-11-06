import { useState } from 'react'
import style from './checkboxStyledElem.module.css'

const CheckboxStyledElem = ({ size, register, typeId }) => {
  const [amount, setAmount] = useState(0)
  const [checked, setChecked] = useState(false)

  const checkboxHandler = (e) => {
    setChecked(e.target.checked)
    document.getElementById(size + typeId).focus()
  }

  const onInputHandler = (e) => {
    setAmount(e.target.value)
  }

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
          placeholder={amount.toString()}
          onInput={onInputHandler}
          id={size + typeId}
        />
      </div>
    </div>
  )
}

export default CheckboxStyledElem
