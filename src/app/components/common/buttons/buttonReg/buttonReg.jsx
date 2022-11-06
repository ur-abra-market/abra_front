import style from './buttonReg.module.css'

const ButtonReg = ({ type, value, isValid }) => {
  return (
    <div>
      <button
        type={type}
        className={isValid ? style.buttonOff : style.buttonOn}
        disabled={isValid}
      >
        {value}
      </button>
    </div>
  )
}

export default ButtonReg
