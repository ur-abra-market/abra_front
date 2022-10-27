import { useCallback } from "react";
import CheckboxStyledElem from "../../common/checkboxStyledElem";
import style from "./checkboxFor.module.css";

const CheckboxFor = ({ register, array, title, getValues }) => {
  const validate = useCallback(() => {
    const values = getValues(array.map((v, index) => v));

    const isValid = values.some((v) => v);
    console.log(isValid);
    return isValid;
  }, []);

  return (
    <div>
      <p className={style.title}>{title}</p>

      <div className={style.checkboxWrapper}>
        {array &&
          array.map((el) => {
            return (
              <CheckboxStyledElem
                size={el}
                register={register(el, {
                  validate,
                })}
                key={el}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CheckboxFor;
