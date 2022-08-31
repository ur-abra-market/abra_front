import style from './textFieldLabelAbove.module.css'

const TextFieldLabelAbove = ({ title, type, placeholder, error, name, register }) => {

    const textareaScroll = (e) => e.target.style.height = e.target.scrollHeight + 'px'
    return (
        <div className={style.inputWrapper}>
            <p className={style.inputTitle}>{title}</p>

            {name === 'textarea' ?
                <textarea
                    {...register}
                    name={name}
                    placeholder={placeholder}
                    className={style.textarea}
                    rows={1}
                    onInput={(e) => textareaScroll(e)} />

                : <input type={type}
                    {...register}
                    name={name}
                    placeholder={placeholder}
                    className={style.inputTextField} />
            }
            {error && <p className={style.inputError}>&#9888; {error}</p>}
        </div>
    );
};

export default TextFieldLabelAbove;