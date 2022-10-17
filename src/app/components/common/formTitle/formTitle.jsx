import { Link } from "react-router-dom";
import style from "./formTitle.module.css";

const FormTitle = ({ title, text, step, link }) => {
    return (
        <div className={style.textWrapper}>
            <p className={style.title}>{title}</p>
            <p className={style.text}>{text}</p>
            
            <div className={style.stepWrapper}>
                <p className={style.step}>{step}</p>
                <Link to={'/'} className={style.link}>{link}</Link>
            </div>
        </div>
    );
};

export default FormTitle;