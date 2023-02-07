import style from './PhonePopup.module.css';

const PhonePopup = (): JSX.Element => {
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
