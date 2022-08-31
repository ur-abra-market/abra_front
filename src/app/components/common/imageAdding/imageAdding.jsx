import { useState } from "react";
import iconImg from "../../../assets/img/icons/icon-img.png";
import style from "./imageAdding.module.css";


const ImageAdding = ({ label, placeholder, name }) => {
    const [logoUrl, setLogoUrl] = useState('')

    const imgChange = (item) => {
        const reader = new FileReader()

        reader.onload = function () {
            setLogoUrl(reader.result)
        };
        reader.readAsDataURL(item.target.files[0]);
    }

    return (
        <div className={style.profileLogoWrapper}>

            <div className={style.inputContainer}>

                <input type="file"
                    accept="image/*"
                    name='profileLogo'
                    id='profileLogo'
                    className={label ? style.inputFileLabel : style.inputFile}
                    onChange={imgChange} />

                {logoUrl ?
                    <img src={logoUrl}
                        alt="avatar img"
                        id="avatarImg"
                        className={label ? style.avatarImgLabel : style.avatarImg} />

                    : <img src={iconImg}
                        alt="icon img"
                        id="iconImg"
                        className={label ? style.iconImgLabel : style.iconImg} />}

                {label ? <div className={style.iconBackgroundLabel} />
                    : <div className={style.iconBackground} />}

            </div>

            <div className={style.labelContainer}>
                <label htmlFor='profileLogo'
                className={style.label}>{label}</label>
                
                <p className={style.placeholder}>{placeholder}</p>
            </div>
        </div>
    );
};

export default ImageAdding;