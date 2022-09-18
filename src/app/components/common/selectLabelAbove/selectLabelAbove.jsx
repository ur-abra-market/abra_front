import style from './selectLabelAbove.module.css'


const SelectLabelAbove = ({ title, name, placeholder, options, error, register }) => {
    return (
        <div>
            <p className={style.selectTitle}>{title}</p>
                    <div className={style.selectContainer}>
                        <select
                            {...register}
                            name={name}
                            defaultValue={''}
                            className={style.selectField}>
                            {placeholder &&
                                <option
                                    value='' disabled hidden>
                                    {placeholder}
                                </option>
                            }
                            {options.map((elem) => {
                                return (<option
                                    className={style.selectOption}
                                    key={elem} value={elem}>
                                    {elem}
                                </option>)
                            })}
                        </select>
                        <span className={style.selectArrow}>&#9660;</span>
                    </div>


            {error && <p className={style.selectError}>&#9888; {error}</p>}
        </div>
    );
};

export default SelectLabelAbove;