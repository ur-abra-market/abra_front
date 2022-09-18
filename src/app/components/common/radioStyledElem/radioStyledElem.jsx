import style from "./radioStyledElem.module.css";


const RadioStyledElem = ({ name, value, choice, register, setChoice }) => {

    const colorValue = value?.slice(0, 1).toUpperCase() + value?.slice(1)

    const valueStr = value.split(' ').join('')
    console.log(choice);
    return (
        <div className={style.colorWrapper}>

            <input type="radio"
                {...register}
                onClick={(e) => setChoice(e.target.value)}
                value={value}
                className={`${style[name]}`}
                name={name} />

            {name === 'color' && <div className={`${value === choice && style.borderContainer} ${style.colorContainer}`}>
                <div className={`${style.colorBlock}  ${style[valueStr]}`} />
                <p className={style.colorValue}>{colorValue}</p>
            </div>}

            {name === 'growth' && <div className={`${value === choice && style.borderContainer} ${style.growthContainer}`}>
                <p className={style.growthValue}>{colorValue}</p>
            </div>}
        </div>
    );
};

export default RadioStyledElem;