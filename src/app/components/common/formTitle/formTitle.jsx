import style from "./formTitle.module.css";

const FormTitle = ({ title, text }) => {
    return (
        <div>
            <p className={style.title}>{title}</p>
            <p className={style.text}>{text}</p>
        </div>
    );
};

export default FormTitle;