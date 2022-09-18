import { useState } from "react";
import RadioStyledElem from "../../common/radioStyledElem";
import style from "./radiosFor.module.css";


const RadiosFor = ({ register, state, array, title, name }) => {

    const [choice, setChoice] = useState(state)

    return (
        <div>
            <p className={style.title}>{title}</p>
            <div className={style.radioWrapper}>
                {array.map((e) => {
                    return <RadioStyledElem name={name}
                        choice={choice}
                        setChoice={setChoice}
                        register={register}
                        value={e}
                        key={e} />
                })}
            </div>
        </div>
    );
};

export default RadiosFor;