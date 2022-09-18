import CheckboxStyledElem from "../../common/checkboxStyledElem";
import style from "./checkboxFor.module.css";


const CheckboxFor = ({ register, array, title }) => {
    return (
        <div>
            <p className={style.title}>{title}</p>

            <div className={style.checkboxWrapper}>
                {array.map((e) => {
                    return <CheckboxStyledElem
                        size={e}
                        register={register(e)}
                        key={e} />
                })}
            </div>
        </div>
    );
};

export default CheckboxFor;