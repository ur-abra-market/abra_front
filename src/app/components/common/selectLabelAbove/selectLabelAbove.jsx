import style from './selectLabelAbove.module.css'
import {generateKey} from "../../../utils/generateKey";


const SelectLabelAbove = ({
                              onChange,
                              onChangeOption,
                              title,
                              name,
                              placeholder,
                              options,
                              error,
                              register,
                              ...restProps
                          }) => {

    const onChangeCallback = (e) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <div>
            <p className={style.selectTitle}>{title}</p>
            <div className={style.selectContainer}>
                <select
                    {...restProps}
                    {...register}
                    name={name}
                    onChange={onChangeCallback}
                    className={style.selectField}>
                    {placeholder &&
                        <option
                            value='' disabled hidden>
                            {placeholder}
                        </option>
                    }
                    {options ? options.map((el, i) => {
                        return (
                            <option className={style.selectOption} key={generateKey(i)}>
                                {el}
                            </option>)
                    }) : []}
                </select>
                <span className={style.selectArrow}>&#9660;</span>
            </div>


            {error && <p className={style.selectError}>&#9888; {error}</p>}
        </div>
    );
};

export default SelectLabelAbove;