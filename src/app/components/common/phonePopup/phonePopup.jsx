import style from "./phonePopup.module.css";

const PhonePopup = () => {
    return (
        <div className={style.popupWrapper}>
            <div className={style.popupContainer}>
                <div className={style.titleWrapper}>
                    <p className={style.title}>Verify your phone number</p>
                </div>
                
            </div>
        </div>
    );
};

export default PhonePopup;