import React, {useState} from 'react';
import style from "../productListRegistrationForm.module.css";
import s from '../../../../components/common/selectLabelAbove/selectLabelAbove.module.css'
import {ucFirst} from "../../../../utils/ucFirst";

export const SelectionsForProperties = ({
                                            element,
                                            arrValues,
                                            register,
                                        }) => {

    const [currentIndex, setCurrentIndex] = useState('0')

    const onChangeCallBack = (e) => {
        setCurrentIndex(e.currentTarget.value)
    }

    const values = element[arrValues[1]].map((el) => el.value)

    return (
        <div className={style.selectInputs}>

            <div className={style.selectEqual}>
                <p className={s.selectTitle}>{ucFirst(`${element[arrValues[0]]}`)}</p>
                <div className={s.selectContainer}>

                    <select name={`${element[arrValues[0]]}`}
                            className={s.selectField}
                            onChange={onChangeCallBack}
                            register={
                                register(`${element[arrValues[0]]}`, {
                                    required: true
                                })}
                    >
                        {values.map((el, i) => (
                            <option className={s.selectOption}
                                    value={i.toString()}
                                    key={i}
                            >
                                {el}
                            </option>
                        ))}
                    </select>
                    <span className={s.selectArrow}>&#9660;</span>
                </div>

            </div>

            <div className={style.selectEqual}>
                <p className={s.selectTitle}>{ucFirst(`${element[arrValues[0]]}(optional)`)}</p>
                <div className={s.selectContainer}>

                    <select name={`${element[arrValues[0]]}(optional)`}
                            register={register(`${element[arrValues[0]]}(optional)`)}
                            className={s.selectField}
                    >
                        <option className={s.selectOption}>
                            {element.values[currentIndex].optional_value}
                        </option>
                    </select>
                    <span className={s.selectArrow}>&#9660;</span>
                </div>
            </div>

        </div>
    )
}
