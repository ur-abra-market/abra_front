import style from "./buttonReg.module.css";


const ButtonReg = ({ type, value, isValid }) => {
    return (
        <div>
            <button type={type}
                className={style.button} >
                {value}
            </button>
        </div>
    );
};

export default ButtonReg;