import CheckboxStyledElem from "../../common/checkboxStyledElem";
import style from "./checkboxFor.module.css";


const CheckboxFor = ({register, array, title}) => {
    return (
        <div>
            <p className={style.title}>{title}</p>

            <div className={style.checkboxWrapper}>
                {array && array.map((el) => {
                    return (
                        <CheckboxStyledElem
                            size={el}
                            register={register(el)}
                            key={el}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default CheckboxFor;