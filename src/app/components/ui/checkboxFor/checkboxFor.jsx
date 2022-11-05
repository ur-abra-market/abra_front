import CheckboxStyledElem from "../../common/checkboxStyledElem";
import style from "./checkboxFor.module.css";
import {useCallback} from "react";

const CheckboxFor = ({register, array, title, getValues, typeId}) => {

    const validate = useCallback(() => {
        const values = getValues(array.map((el) => `${typeId}-${el}`))

        const isValid = values.some((el) => el)

        console.log(getValues())

        return isValid
    }, [])



    return (
        <div>
            <p className={style.title}>{title}</p>

            <div className={style.checkboxWrapper}>
                {array && array.map((el) => {
                    return (
                        <CheckboxStyledElem key={el}
                                            typeId={typeId}
                                            size={el}
                                            register={register(`${typeId}-${el}`, {
                                                validate,
                                            })}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CheckboxFor;
