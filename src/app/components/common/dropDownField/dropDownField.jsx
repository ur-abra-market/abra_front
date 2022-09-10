import { useState } from "react";
import style from "./dropDownField.module.css";

const DropDownField = ({ children, title }) => {
    const [open, setOpen] = useState(false)

    const onClick = () => {
        setOpen(!open)
    }
    return (
        <div>
            <div className={style.title}
                onClick={onClick}>
                <p className={style.titleText}>{title}</p>
                <span className={open ? style.arrowOn
                    : style.arrowOff}>&#9660;</span>
            </div>

            {open && <div className={style.children}>
                {children}
            </div>
}
        </div>
    );
};

export default DropDownField;