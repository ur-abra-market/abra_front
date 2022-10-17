import {useState} from "react";
import RadioStyledElem from "../../common/radioStyledElem";
import style from "./radiosFor.module.css";


const RadiosFor = ({register, state, array, title, name}) => {

    const [choice, setChoice] = useState(state)

    return (
        <div>
            <p className={style.title}>{title}</p>
            <div className={style.radioWrapper}>
                {array && array.map((el, i) => {
                    return <RadioStyledElem key={i}
                                            name={name}
                                            choice={choice}
                                            setChoice={setChoice}
                                            register={register}
                                            value={el}

                    />
                })}
            </div>
        </div>
    );
};

export default RadiosFor;