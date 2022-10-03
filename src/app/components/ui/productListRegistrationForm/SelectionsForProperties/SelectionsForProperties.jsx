import React, {useState} from 'react';
import style from "../productListRegistrationForm.module.css";
import s from '../../../../components/common/selectLabelAbove/selectLabelAbove.module.css'
import {ucFirst} from "../../../../utils/ucFirst";

export const SelectionsForProperties = ({element, register, options}) => {

    const [currentValue, setCurrentValue] = useState('')

    const arrFilteredOptValues = element.values
        .filter(el => el.value === currentValue && el.optional_value !== null)
        .map(el => el.optional_value)

    return (
        <div className={style.selectInputs}>

            <div className={style.selectEqual}>
                <p className={s.selectTitle}>{ucFirst(`${element.key}`)}</p>
                <div className={s.selectContainer}>

                    <select
                        {...register(`${element.key}`, {
                            required: true,
                            onChange: (e) => {
                                setCurrentValue(e.target.value)
                            }
                        })}
                        className={s.selectField}
                    >

                        <option hidden
                                value=''
                        >
                            {'Select'}
                        </option>

                        {options.map((el, i) => (
                            <option key={i}
                                    className={s.selectOption}
                                    value={el}
                            >
                                {el}
                            </option>
                        ))}
                    </select>
                    <span className={s.selectArrow}>&#9660;</span>
                </div>

            </div>


            {!!arrFilteredOptValues.length &&

                <div className={style.selectEqual}>
                    <p className={s.selectTitle}>{ucFirst(`${element.key}(optional)`)}</p>
                    <div className={s.selectContainer}>
                        <select
                            {...register(`${element.key}(optional)`)}
                            className={s.selectField}
                        >

                            <option hidden value=''>
                                {'Select'}
                            </option>

                            {arrFilteredOptValues.map((el, i) => (
                                <option key={i}
                                        className={s.selectOption}
                                        value={el}
                                >
                                    {el}
                                </option>
                            ))}
                        </select>
                        <span className={s.selectArrow}>&#9660;</span>
                    </div>
                </div>}

        </div>
    )
}
