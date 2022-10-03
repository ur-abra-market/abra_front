import style from "./buttonReg.module.css";


const ButtonReg = ({type, value, isValid, isDisableSubmit}) => {

    return (
        <div>
            <button type={type}
                    className={isValid ? style.buttonOff : style.buttonOn}
                    disabled={isValid && isDisableSubmit}>
                {value}
            </button>
        </div>
    );
};

export default ButtonReg;